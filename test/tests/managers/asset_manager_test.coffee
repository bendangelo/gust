describe "managers/asset_manager", ->

    it "should get name", ->
        path = "blah/tree.png"

        expect(Gust.AssetManager.srcName(path)).to.eql "tree.png"