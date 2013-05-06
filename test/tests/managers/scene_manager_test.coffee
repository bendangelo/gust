describe "managers/scene_manager", ->
    sceneManager = scene = null

    beforeEach ->
        sceneManager = new Gust.SceneManager()
        scene = new Gust.Scene()

        sceneManager.add "scene", scene

    it "enter scene", ->
        stub = sinon.stub(scene, "enter")

        sceneManager.enter("scene")

        expect(stub).to.be.called

    it "should update current scene", ->
        stub = sinon.stub(scene, "update")
        sceneManager.enter("scene")

        sceneManager.update()

        expect(stub).to.be.called

    it "should draw current scene", ->
        stub = sinon.stub(scene, "draw")
        sceneManager.enter("scene")

        sceneManager.draw()

        expect(stub).to.be.called
