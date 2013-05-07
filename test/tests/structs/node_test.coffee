describe "structs/node", ->

    node = null

    beforeEach ->
        node = new Gust.Node()

    it "should have unique id", ->
        expect(node.id).to.be.a("number")