describe "structs/map", ->
    map = null

    beforeEach ->
        map = new Gust.Map()

    it "set", ->
        value = 10

        map.set(1, 1, value)

        expect(map.data[1][1]).to.eql value

    it "get", ->
        value = 10

        map.set 1, 1, value

        expect(map.get 1, 1).to.eql value

    it "within", ->
        value = 3

        map.set 1, 1, value

        expect(map.within(1,1)).to.be.ok

        expect(map.within(2,1)).to.not.be.ok

        expect(map.lengthX).to.eql 2
        expect(map.lengthY).to.eql 2

    it "clear", ->
        map.set 1, 1, 10

        map.clear()

        expect(map.lengthX).to.eql 0
        expect(map.lengthY).to.eql 0

    it "reset", ->

        map.set 1, 2, 10

        map.reset(2)

        expect(map.get(1, 2)).to.eql 2

    it "copy", ->

        map.copy([[1]])

        expect(map.get(0,0)).to.eql 1