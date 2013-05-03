describe "core/timer", ->

    it "should return tick", ->
        expect(Gust.Timer.tick()).to.be.above 0