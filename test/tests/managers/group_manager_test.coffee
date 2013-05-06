describe "managers/group_manager", ->

    groupManager = group = condition = null

    beforeEach ->
        group = new Gust.Group()
        groupManager = new Gust.GroupManager()
        condition = (node) -> node instanceof Gust.Node
        groupManager.add "group", group, condition

    it "should add group with condition", ->


        expect(groupManager.items.group).to.eql group
        expect(groupManager.groups.group).to.eql condition

    it "should add node to right group", ->
        stub = sinon.stub(group, "add")

        node = new Gust.Node()

        groupManager.addNode node

        expect(stub.called).to.be.ok

    it "should remove node from groups", ->

        node = new Gust.Node()

        groupManager.addNode node

        groupManager.removeNode node

        expect(groupManager.nodes).to.be.empty