describe "core/events", ->
    event = null

    beforeEach ->
       event = new Gust.Events()

    it "should trigger event", ->

        call = sinon.spy()
        context = 10;

        event.on("trigger", call, context);

        event.trigger("trigger", 10);

        expect(call).to.be.called
        expect(call).to.be.calledWith 10
        expect(event._events.trigger).to.exist

        event.off()

        expect(event._events.trigger).to.not.exist

    it "should listenTo", ->
        blah = new Gust.Events()

        call = sinon.spy()

        blah.listenTo(event, "hello", call)

        event.trigger "hello", 10

        expect(call).to.be.called
        expect(call).to.be.calledWith 10

    describe "should stopListening", ->
        blah = call = null

        beforeEach ->
            blah = new Gust.Events()

            call = sinon.spy()

            blah.listenTo(event, "hello", call)
            blah.listenTo(event, "hey", call)

        it "should stop listening without events", ->
            blah = new Gust.Events()

            expect(blah.stopListening()).to.equal(blah)

        it "to callback", ->

            blah.stopListening event, "hello", call
            expect(blah._listens[0].type).to.eql "hey"
            expect(blah._listens).to.have.length 1

        it "to type", ->

            blah.stopListening event, "hello"
            expect(blah._listens[0].type).to.eql "hey"
            expect(blah._listens).to.have.length 1

        it "to target", ->

            blah.stopListening event
            expect(blah._listens).to.be.empty

        it "to all", ->

            blah.stopListening()

            expect(blah._listens).to.be.empty