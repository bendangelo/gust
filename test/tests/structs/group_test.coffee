describe "structs/group", ->

    group = node = null

    beforeEach ->
        group = new Gust.Group()
        node = new Gust.Node()

    it "should add node", ->
        spy = sinon.spy()

        group.on "add", spy

        group.add node

        expect(spy).to.be.called
        expect(group.nodes).to.contain node
        expect(group.length).to.eql 1

    it "should add nodes", ->
        spy = sinon.spy()

        group.on "add", spy

        group.add [node]

        expect(spy).to.be.called
        expect(group.nodes).to.contain node
        expect(group.length).to.eql 1

    it "should remove node", ->
        spy = sinon.spy()

        group.on "remove", spy

        group.add node
        group.remove node

        expect(spy).to.be.called
        expect(group.nodes).to.be.empty
        expect(group.length).to.eql 0

    it "should remove nodes", ->
        spy = sinon.spy()

        group.on "remove", spy

        group.add node
        group.remove node

        expect(spy).to.be.called
        expect(group.nodes).to.be.empty
        expect(group.length).to.eql 0

    it "should get node", ->
        group.add node

        expect(group.get node.id).to.eql node

    it "should get at index", ->
        group.add node

        expect(group.at 0).to.eql node

    it "should clear group", ->
        group.add node

        group.clear()

        expect(group.nodes).to.be.empty
        expect(group.length).to.eql 0