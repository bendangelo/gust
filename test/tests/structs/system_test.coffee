describe "structs/system", ->

    system = group = node = null

    beforeEach ->
        node = new Gust.Node()
        group = new Gust.Group()
        group.add node

        system = new Gust.System(group)

        system.process = (e)-> e.called = true

    it "should process nodes", ->
        system.processAll()

        expect(node.called).to.be.ok