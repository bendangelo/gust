describe "core/manager", ->
    manager = null

    beforeEach ->
        manager = new Gust.Manager()

    it "should add item", ->
        manager.add "key", 10

        expect(manager.items.key).to.eql 10

    it "should get item", ->
        manager.add "key", 10

        expect(manager.get("key")).to.eql 10

    it "should remove item", ->
        manager.add "key", 10

        expect(manager.get("key")).to.eql 10

        manager.remove "key"

        expect(manager.items.key).to.not.exist