Bridge.assembly("BridgedSirFlocksalot", function ($asm, globals) {
    "use strict";


    var $m = Bridge.setMetadata,
        $n = ["System.Collections.Generic","Microsoft.Xna.Framework.Graphics","System","Microsoft.Xna.Framework","SirFlocksalot"];
    $m("SirFlocksalot.Flock", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"CreateFlock","t":8,"pi":[{"n":"PetalTextures","pt":$n[0].List$1(Microsoft.Xna.Framework.Graphics.Texture2D),"ps":0},{"n":"RogueTexture","pt":$n[1].Texture2D,"ps":1}],"sn":"CreateFlock","rt":$n[2].Void,"p":[$n[0].List$1(Microsoft.Xna.Framework.Graphics.Texture2D),$n[1].Texture2D]},{"a":2,"n":"Draw","t":8,"pi":[{"n":"SB","pt":$n[1].SpriteBatch,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].SpriteBatch]},{"a":2,"n":"Update","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1},{"n":"TimeModifier","pt":$n[2].Single,"ps":2}],"sn":"Update","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single,$n[2].Single]},{"a":1,"n":"Agents","t":4,"rt":$n[0].List$1(SirFlocksalot.Agent),"sn":"Agents"},{"a":2,"n":"NumFlock","is":true,"t":4,"rt":$n[2].Int32,"sn":"NumFlock","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"NumRogue","is":true,"t":4,"rt":$n[2].Int32,"sn":"NumRogue","box":function ($v) { return Bridge.box($v, System.Int32);}}]}; }, $n);
    $m("SirFlocksalot.Agent", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"v":true,"a":2,"n":"Draw","t":8,"pi":[{"n":"SB","pt":$n[1].SpriteBatch,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].SpriteBatch]},{"a":3,"n":"Seek","t":8,"pi":[{"n":"Target","pt":$n[3].Vector2,"ps":0}],"sn":"Seek","rt":$n[3].Vector2,"p":[$n[3].Vector2]},{"v":true,"a":2,"n":"Update","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1},{"n":"TimeModifier","pt":$n[2].Single,"ps":2},{"n":"Agents","pt":$n[0].List$1(SirFlocksalot.Agent),"ps":3}],"sn":"Update","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single,$n[2].Single,$n[0].List$1(SirFlocksalot.Agent)]},{"a":3,"n":"Acceleration","t":4,"rt":$n[3].Vector2,"sn":"Acceleration"},{"a":2,"n":"AgentId","t":4,"rt":$n[2].Int32,"sn":"AgentId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"CurrentAgentId","is":true,"t":4,"rt":$n[2].Int32,"sn":"CurrentAgentId","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":2,"n":"IsRogue","t":4,"rt":$n[2].Boolean,"sn":"IsRogue","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":3,"n":"MaxForce","t":4,"rt":$n[2].Single,"sn":"MaxForce","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"MaxForceSqared","t":4,"rt":$n[2].Single,"sn":"MaxForceSqared","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"MaxSpeed","t":4,"rt":$n[2].Single,"sn":"MaxSpeed","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"MaxSpeedSquared","t":4,"rt":$n[2].Single,"sn":"MaxSpeedSquared","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"MaxTurnRate","t":4,"rt":$n[2].Single,"sn":"MaxTurnRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"Orientation","t":4,"rt":$n[2].Single,"sn":"Orientation","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":3,"n":"Texture","t":4,"rt":$n[1].Texture2D,"sn":"Texture"},{"a":2,"n":"Velocity","t":4,"rt":$n[3].Vector2,"sn":"Velocity"}]}; }, $n);
    $m("SirFlocksalot.FlockAgent", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Texture2D],"pi":[{"n":"AgentTexture","pt":$n[1].Texture2D,"ps":0}],"sn":"ctor"},{"ov":true,"a":2,"n":"Draw","t":8,"pi":[{"n":"SB","pt":$n[1].SpriteBatch,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].SpriteBatch]},{"a":1,"n":"FindNeighbors","t":8,"pi":[{"n":"Agents","pt":$n[0].List$1(SirFlocksalot.Agent),"ps":0}],"sn":"FindNeighbors","rt":$n[0].List$1(SirFlocksalot.Agent),"p":[$n[0].List$1(SirFlocksalot.Agent)]},{"a":1,"n":"Flit","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1}],"sn":"Flit","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single]},{"a":1,"n":"Flock","t":8,"pi":[{"n":"Neighbors","pt":$n[0].List$1(SirFlocksalot.Agent),"ps":0}],"sn":"Flock","rt":$n[3].Vector2,"p":[$n[0].List$1(SirFlocksalot.Agent)]},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1},{"n":"TimeModifier","pt":$n[2].Single,"ps":2},{"n":"Agents","pt":$n[0].List$1(SirFlocksalot.Agent),"ps":3}],"sn":"Update","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single,$n[2].Single,$n[0].List$1(SirFlocksalot.Agent)]},{"a":1,"n":"UpdateColor","t":8,"pi":[{"n":"DeltaTime","pt":$n[2].Single,"ps":0}],"sn":"UpdateColor","rt":$n[2].Void,"p":[$n[2].Single]},{"a":1,"n":"AlignmentWeight","t":4,"rt":$n[2].Single,"sn":"AlignmentWeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"CohesionWeight","t":4,"rt":$n[2].Single,"sn":"CohesionWeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"ColorFalloff","t":4,"rt":$n[2].Single,"sn":"ColorFalloff","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"DrawPosition","t":4,"rt":$n[3].Vector2,"sn":"DrawPosition"},{"a":1,"n":"FlockAngle","t":4,"rt":$n[2].Single,"sn":"FlockAngle","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"FlockDistance","t":4,"rt":$n[2].Single,"sn":"FlockDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"FlockDistanceSqared","t":4,"rt":$n[2].Single,"sn":"FlockDistanceSqared","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"NumNeighbors","t":4,"rt":$n[2].Int32,"sn":"NumNeighbors","box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"POrientation","t":4,"rt":$n[2].Single,"sn":"POrientation","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"PRadius","t":4,"rt":$n[2].Single,"sn":"PRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"PTheta","t":4,"rt":$n[2].Single,"sn":"PTheta","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"PerlinBeat","t":4,"rt":$n[2].Single,"sn":"PerlinBeat","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"PetalColor","t":4,"rt":$n[3].Color,"sn":"PetalColor"},{"a":1,"n":"SeparationWeight","t":4,"rt":$n[2].Single,"sn":"SeparationWeight","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("SirFlocksalot.RogueAgent", function () { return {"nested":[$n[4].RogueAgent.PastPosition],"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"p":[$n[1].Texture2D],"pi":[{"n":"inTexture","pt":$n[1].Texture2D,"ps":0}],"sn":"ctor"},{"a":1,"n":"CreateHistory","t":8,"sn":"CreateHistory","rt":$n[2].Void},{"ov":true,"a":2,"n":"Draw","t":8,"pi":[{"n":"SB","pt":$n[1].SpriteBatch,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].SpriteBatch]},{"a":1,"n":"RogueSeek","t":8,"sn":"RogueSeek","rt":$n[2].Void},{"ov":true,"a":2,"n":"Update","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1},{"n":"TimeModifier","pt":$n[2].Single,"ps":2},{"n":"Agents","pt":$n[0].List$1(SirFlocksalot.Agent),"ps":3}],"sn":"Update","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single,$n[2].Single,$n[0].List$1(SirFlocksalot.Agent)]},{"a":1,"n":"Wander","t":8,"pi":[{"n":"CurrentTime","pt":$n[2].Single,"ps":0},{"n":"DeltaTime","pt":$n[2].Single,"ps":1}],"sn":"Wander","rt":$n[2].Void,"p":[$n[2].Single,$n[2].Single]},{"a":1,"n":"DilationDistance","t":4,"rt":$n[2].Single,"sn":"DilationDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"DilationDistanceSquared","t":4,"rt":$n[2].Single,"sn":"DilationDistanceSquared","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"FlowForce","t":4,"rt":$n[3].Vector2,"sn":"FlowForce"},{"a":2,"n":"IsSeeking","t":4,"rt":$n[2].Boolean,"sn":"IsSeeking","box":function ($v) { return Bridge.box($v, System.Boolean, System.Boolean.toString);}},{"a":1,"n":"Past","t":4,"rt":$n[0].List$1(SirFlocksalot.RogueAgent.PastPosition),"sn":"Past"},{"a":1,"n":"SeekStrength","t":4,"rt":$n[2].Single,"sn":"SeekStrength","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Target","t":4,"rt":$n[3].Vector2,"sn":"Target"},{"a":1,"n":"TargetObject","t":4,"rt":$n[4].GameObject,"sn":"TargetObject"},{"a":1,"n":"WanderAmp","t":4,"rt":$n[2].Single,"sn":"WanderAmp","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderDelta","t":4,"rt":$n[2].Single,"sn":"WanderDelta","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderDistance","t":4,"rt":$n[2].Single,"sn":"WanderDistance","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderRadius","t":4,"rt":$n[2].Single,"sn":"WanderRadius","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderRate","t":4,"rt":$n[2].Single,"sn":"WanderRate","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderStrength","t":4,"rt":$n[2].Single,"sn":"WanderStrength","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"WanderTheta","t":4,"rt":$n[2].Single,"sn":"WanderTheta","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}}]}; }, $n);
    $m("SirFlocksalot.RogueAgent.PastPosition", function () { return {"td":$n[4].RogueAgent,"att":1048579,"a":1,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Color","t":4,"rt":$n[3].Color,"sn":"Color"},{"a":2,"n":"Position","t":4,"rt":$n[3].Vector2,"sn":"Position"}]}; }, $n);
    $m("SirFlocksalot.FlockTools", function () { return {"att":1048960,"a":4,"s":true,"m":[{"a":2,"n":"GetRandomFloat","is":true,"t":8,"pi":[{"n":"Value","pt":$n[2].Single,"ps":0}],"sn":"GetRandomFloat","rt":$n[2].Single,"p":[$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"GetRandomFloat","is":true,"t":8,"pi":[{"n":"Min","pt":$n[2].Single,"ps":0},{"n":"Max","pt":$n[2].Single,"ps":1}],"sn":"GetRandomFloat$1","rt":$n[2].Single,"p":[$n[2].Single,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":4,"n":"GetRandomInteger","is":true,"t":8,"pi":[{"n":"MaxValue","pt":$n[2].Int32,"ps":0}],"sn":"GetRandomInteger","rt":$n[2].Int32,"p":[$n[2].Int32],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":4,"n":"GetRandomVector2","is":true,"t":8,"pi":[{"n":"MinX","pt":$n[2].Single,"ps":0},{"n":"MaxX","pt":$n[2].Single,"ps":1},{"n":"MinY","pt":$n[2].Single,"ps":2},{"n":"MaxY","pt":$n[2].Single,"ps":3}],"sn":"GetRandomVector2","rt":$n[3].Vector2,"p":[$n[2].Single,$n[2].Single,$n[2].Single,$n[2].Single]},{"a":2,"n":"GetSafeNormal","is":true,"t":8,"pi":[{"n":"Vector","pt":$n[3].Vector2,"ps":0}],"sn":"GetSafeNormal","rt":$n[3].Vector2,"p":[$n[3].Vector2]},{"a":2,"n":"Heading","is":true,"t":8,"pi":[{"n":"Vector","pt":$n[3].Vector2,"ps":0}],"sn":"Heading","rt":$n[2].Single,"p":[$n[3].Vector2],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"Limit","is":true,"t":8,"pi":[{"n":"Vector","ref":true,"pt":$n[3].Vector2,"ps":0},{"n":"LimitSquared","pt":$n[2].Single,"ps":1},{"n":"Limit","pt":$n[2].Single,"ps":2}],"sn":"Limit","rt":$n[2].Void,"p":[$n[3].Vector2,$n[2].Single,$n[2].Single]},{"a":2,"n":"Map","is":true,"t":8,"pi":[{"n":"value","pt":$n[2].Single,"ps":0},{"n":"fromSource","pt":$n[2].Single,"ps":1},{"n":"toSource","pt":$n[2].Single,"ps":2},{"n":"fromTarget","pt":$n[2].Single,"ps":3},{"n":"toTarget","pt":$n[2].Single,"ps":4}],"sn":"Map","rt":$n[2].Single,"p":[$n[2].Single,$n[2].Single,$n[2].Single,$n[2].Single,$n[2].Single],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"Pick","is":true,"t":8,"pi":[{"n":"Options","pt":$n[0].List$1(System.Object),"ps":0}],"tpc":1,"tprm":["T"],"sn":"Pick","rt":System.Object,"p":[$n[0].List$1(System.Object)]},{"a":2,"n":"WrapVector","is":true,"t":8,"pi":[{"n":"Vector","ref":true,"pt":$n[3].Vector2,"ps":0},{"n":"Bounds","pt":$n[3].Vector2,"ps":1},{"n":"ErrorTolerance","pt":$n[2].Single,"ps":2}],"sn":"WrapVector","rt":$n[2].Void,"p":[$n[3].Vector2,$n[3].Vector2,$n[2].Single]},{"a":1,"n":"Randomizer","is":true,"t":4,"rt":$n[2].Random,"sn":"Randomizer"}]}; }, $n);
    $m("SirFlocksalot.Noise", function () { return {"att":385,"a":2,"s":true,"m":[{"n":".cctor","t":1,"sn":"ctor","sm":true},{"a":2,"n":"GetNoise","is":true,"t":8,"pi":[{"n":"pX","pt":$n[2].Double,"ps":0},{"n":"pY","pt":$n[2].Double,"ps":1},{"n":"pZ","pt":$n[2].Double,"ps":2}],"sn":"GetNoise","rt":$n[2].Single,"p":[$n[2].Double,$n[2].Double,$n[2].Double],"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"dot","is":true,"t":8,"pi":[{"n":"g","pt":$n[2].Array.type(System.Int32),"ps":0},{"n":"x","pt":$n[2].Double,"ps":1},{"n":"y","pt":$n[2].Double,"ps":2},{"n":"z","pt":$n[2].Double,"ps":3}],"sn":"dot","rt":$n[2].Double,"p":[$n[2].Array.type(System.Int32),$n[2].Double,$n[2].Double,$n[2].Double],"box":function ($v) { return Bridge.box($v, System.Double, System.Double.format, System.Double.getHashCode);}},{"a":1,"n":"fastfloor","is":true,"t":8,"pi":[{"n":"x","pt":$n[2].Double,"ps":0}],"sn":"fastfloor","rt":$n[2].Int32,"p":[$n[2].Double],"box":function ($v) { return Bridge.box($v, System.Int32);}},{"a":1,"n":"grad3","is":true,"t":4,"rt":$n[2].Array.type(System.Array.type(System.Int32)),"sn":"grad3"},{"a":1,"n":"p","is":true,"t":4,"rt":$n[2].Array.type(System.Int32),"sn":"p"},{"a":1,"n":"perm","is":true,"t":4,"rt":$n[2].Array.type(System.Int32),"sn":"perm"}]}; }, $n);
    $m("SirFlocksalot.Moon", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":4,"n":"Draw","t":8,"pi":[{"n":"SB","pt":$n[1].SpriteBatch,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[1].SpriteBatch]},{"a":2,"n":"Update","t":8,"pi":[{"n":"DeltaTime","pt":$n[2].Single,"ps":0}],"sn":"Update","rt":$n[2].Void,"p":[$n[2].Single]},{"a":1,"n":"AnchorPosition","t":4,"rt":$n[3].Vector2,"sn":"AnchorPosition","ro":true},{"a":1,"n":"Orientation","t":4,"rt":$n[2].Single,"sn":"Orientation","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"Speed","t":4,"rt":$n[2].Single,"sn":"Speed","ro":true,"box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":2,"n":"Texture","t":4,"rt":$n[1].Texture2D,"sn":"Texture"}]}; }, $n);
    $m("SirFlocksalot.GameObject", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Position","t":4,"rt":$n[3].Vector2,"sn":"Position"}]}; }, $n);
    $m("SirFlocksalot.SirFlocksalotGame", function () { return {"att":1048577,"a":2,"m":[{"a":2,"n":".ctor","t":1,"sn":"ctor"},{"ov":true,"a":3,"n":"Draw","t":8,"pi":[{"n":"gameTime","pt":$n[3].GameTime,"ps":0}],"sn":"Draw","rt":$n[2].Void,"p":[$n[3].GameTime]},{"ov":true,"a":3,"n":"Initialize","t":8,"sn":"Initialize","rt":$n[2].Void},{"ov":true,"a":3,"n":"LoadContent","t":8,"sn":"LoadContent","rt":$n[2].Void},{"ov":true,"a":3,"n":"UnloadContent","t":8,"sn":"UnloadContent","rt":$n[2].Void},{"ov":true,"a":3,"n":"Update","t":8,"pi":[{"n":"gameTime","pt":$n[3].GameTime,"ps":0}],"sn":"Update","rt":$n[2].Void,"p":[$n[3].GameTime]},{"a":1,"n":"BackgroundTexture","t":4,"rt":$n[1].Texture2D,"sn":"BackgroundTexture"},{"a":1,"n":"DebugFont","t":4,"rt":$n[1].SpriteFont,"sn":"DebugFont"},{"a":1,"n":"Flock","t":4,"rt":$n[4].Flock,"sn":"Flock"},{"a":1,"n":"Moon","t":4,"rt":$n[4].Moon,"sn":"Moon"},{"a":1,"n":"PetalTextures","t":4,"rt":$n[0].List$1(Microsoft.Xna.Framework.Graphics.Texture2D),"sn":"PetalTextures"},{"a":1,"n":"RogueTexture","t":4,"rt":$n[1].Texture2D,"sn":"RogueTexture"},{"a":2,"n":"ScreenSize","is":true,"t":4,"rt":$n[3].Point,"sn":"ScreenSize"},{"a":1,"n":"TimeModifier","t":4,"rt":$n[2].Single,"sn":"TimeModifier","box":function ($v) { return Bridge.box($v, System.Single, System.Single.format, System.Single.getHashCode);}},{"a":1,"n":"graphics","t":4,"rt":$n[3].GraphicsDeviceManager,"sn":"graphics"},{"a":1,"n":"spriteBatch","t":4,"rt":$n[1].SpriteBatch,"sn":"spriteBatch"}]}; }, $n);
    $m("BridgedSirFlocksalot.App", function () { return {"att":1048577,"a":2,"m":[{"a":2,"isSynthetic":true,"n":".ctor","t":1,"sn":"ctor"},{"a":2,"n":"Main","is":true,"t":8,"sn":"Main","rt":$n[2].Void},{"a":1,"n":"game","is":true,"t":4,"rt":$n[3].Game,"sn":"game"}]}; }, $n);
});
