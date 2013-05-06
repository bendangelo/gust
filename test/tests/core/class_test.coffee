describe "core/class", ->
    Cat = cat = null

    beforeEach ->
       Cat = Gust.Class.extend
            name: "cat"

       cat = new Cat()

    it "should create new class", ->

        expect(cat.name).to.eql Cat.prototype.name

    it "should mixin new attributes", ->

        mixin = {
            level: 0
        };

        Gust.Class.mixin(Cat, mixin);

        expect(Cat.prototype.level).to.eql mixin.level