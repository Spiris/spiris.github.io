/**
 * @version 1.0.0.0
 * @copyright Copyright ©  2019
 * @compiler Bridge.NET 17.6.0
 */
Bridge.assembly("BridgedSirFlocksalot", function ($asm, globals) {
    "use strict";

    Bridge.define("BridgedSirFlocksalot.App", {
        main: function Main () {
            var canvas = document.createElement("canvas");
            canvas.width = (SirFlocksalot.SirFlocksalotGame.ScreenSize.X) >>> 0;
            canvas.height = (SirFlocksalot.SirFlocksalotGame.ScreenSize.Y) >>> 0;
            canvas.id = "monogamecanvas";
            document.body.appendChild(canvas);



            BridgedSirFlocksalot.App.game = new SirFlocksalot.SirFlocksalotGame();
            BridgedSirFlocksalot.App.game.Run();
        },
        statics: {
            fields: {
                game: null
            }
        }
    });

    Bridge.define("SirFlocksalot.GameObject", {
        fields: {
            Position: null
        },
        ctors: {
            init: function () {
                this.Position = new Microsoft.Xna.Framework.Vector2();
                this.Position = Microsoft.Xna.Framework.Vector2.Zero.$clone();
            },
            ctor: function () {
                this.$initialize();
            }
        }
    });

    Bridge.define("SirFlocksalot.Flock", {
        statics: {
            fields: {
                NumFlock: 0,
                NumRogue: 0
            },
            ctors: {
                init: function () {
                    this.NumFlock = 47;
                    this.NumRogue = 3;
                }
            }
        },
        fields: {
            Agents: null
        },
        ctors: {
            init: function () {
                this.Agents = new (System.Collections.Generic.List$1(SirFlocksalot.Agent)).ctor();
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            CreateFlock: function (PetalTextures, RogueTexture) {
                for (var i = 0; i < SirFlocksalot.Flock.NumFlock; i = (i + 1) | 0) {
                    this.Agents.add(new SirFlocksalot.FlockAgent(SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Graphics.Texture2D, PetalTextures)));
                }
                for (var i1 = 0; i1 < SirFlocksalot.Flock.NumRogue; i1 = (i1 + 1) | 0) {
                    this.Agents.add(new SirFlocksalot.RogueAgent(RogueTexture));
                }
            },
            Update: function (CurrentTime, DeltaTime, TimeModifier) {
                var $t;
                $t = Bridge.getEnumerator(this.Agents);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;
                        a.Update(CurrentTime, DeltaTime, TimeModifier, this.Agents);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            },
            Draw: function (SB) {
                var $t;
                $t = Bridge.getEnumerator(this.Agents);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;
                        a.Draw(SB);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });

    Bridge.define("SirFlocksalot.FlockTools", {
        statics: {
            fields: {
                Randomizer: null
            },
            ctors: {
                init: function () {
                    this.Randomizer = new System.Random.ctor();
                }
            },
            methods: {
                GetRandomFloat: function (Value) {
                    return SirFlocksalot.FlockTools.Randomizer.NextDouble() * Value;
                },
                GetRandomFloat$1: function (Min, Max) {
                    var AbsTotal = Math.abs(Min) + Math.abs(Max);
                    return SirFlocksalot.FlockTools.Randomizer.NextDouble() * AbsTotal + Min;
                },
                Map: function (value, fromSource, toSource, fromTarget, toTarget) {
                    return (value - fromSource) / (toSource - fromSource) * (toTarget - fromTarget) + fromTarget;
                },
                Limit: function (Vector, LimitSquared, Limit) {
                    if (Vector.v.LengthSquared() > LimitSquared) {
                        Vector.v.Normalize();
                        Vector.v = Microsoft.Xna.Framework.Vector2.op_Multiply$1(Vector.v.$clone(), Limit);
                    }
                },
                Heading: function (Vector) {
                    return Math.atan2(Vector.Y, Vector.X);
                },
                GetSafeNormal: function (Vector) {
                    if (Vector.LengthSquared() > 0.01) {
                        return Microsoft.Xna.Framework.Vector2.Normalize(Vector.$clone());
                    }
                    return Microsoft.Xna.Framework.Vector2.Zero.$clone();
                },
                Pick: function (T, Options) {
                    if (Options.Count > 0) {
                        return Options.getItem(SirFlocksalot.FlockTools.Randomizer.Next$1(Options.Count));
                    }
                    throw new System.Exception();
                },
                WrapVector: function (Vector, Bounds, ErrorTolerance) {
                    var Right = Bounds.X + ErrorTolerance;
                    var Left = -ErrorTolerance;
                    if (Vector.v.X > Right) {
                        Vector.v.X = Left;
                    } else {
                        if (Vector.v.X < Left) {
                            Vector.v.X = Right;
                        }
                    }
                    var Top = -ErrorTolerance;
                    var Bottom = Bounds.Y + ErrorTolerance;
                    if (Vector.v.Y > Bottom) {
                        Vector.v.Y = Top;
                    } else {
                        if (Vector.v.Y < Top) {
                            Vector.v.Y = Bottom;
                        }
                    }
                },
                GetRandomInteger: function (MaxValue) {
                    return SirFlocksalot.FlockTools.Randomizer.Next$1(MaxValue);
                },
                GetRandomVector2: function (MinX, MaxX, MinY, MaxY) {
                    return new Microsoft.Xna.Framework.Vector2.$ctor2(SirFlocksalot.FlockTools.GetRandomFloat$1(MinX, MaxX), SirFlocksalot.FlockTools.GetRandomFloat$1(MinY, MaxY));
                }
            }
        }
    });

    Bridge.define("SirFlocksalot.Noise", {
        statics: {
            fields: {
                grad3: null,
                p: null,
                perm: null
            },
            ctors: {
                init: function () {
                    this.grad3 = System.Array.init([System.Array.init([1, 1, 0], System.Int32), System.Array.init([-1, 1, 0], System.Int32), System.Array.init([1, -1, 0], System.Int32), System.Array.init([-1, -1, 0], System.Int32), System.Array.init([1, 0, 1], System.Int32), System.Array.init([-1, 0, 1], System.Int32), System.Array.init([1, 0, -1], System.Int32), System.Array.init([-1, 0, -1], System.Int32), System.Array.init([0, 1, 1], System.Int32), System.Array.init([0, -1, 1], System.Int32), System.Array.init([0, 1, -1], System.Int32), System.Array.init([0, -1, -1], System.Int32)], System.Array.type(System.Int32));
                    this.p = System.Array.init([
                        151, 
                        160, 
                        137, 
                        91, 
                        90, 
                        15, 
                        131, 
                        13, 
                        201, 
                        95, 
                        96, 
                        53, 
                        194, 
                        233, 
                        7, 
                        225, 
                        140, 
                        36, 
                        103, 
                        30, 
                        69, 
                        142, 
                        8, 
                        99, 
                        37, 
                        240, 
                        21, 
                        10, 
                        23, 
                        190, 
                        6, 
                        148, 
                        247, 
                        120, 
                        234, 
                        75, 
                        0, 
                        26, 
                        197, 
                        62, 
                        94, 
                        252, 
                        219, 
                        203, 
                        117, 
                        35, 
                        11, 
                        32, 
                        57, 
                        177, 
                        33, 
                        88, 
                        237, 
                        149, 
                        56, 
                        87, 
                        174, 
                        20, 
                        125, 
                        136, 
                        171, 
                        168, 
                        68, 
                        175, 
                        74, 
                        165, 
                        71, 
                        134, 
                        139, 
                        48, 
                        27, 
                        166, 
                        77, 
                        146, 
                        158, 
                        231, 
                        83, 
                        111, 
                        229, 
                        122, 
                        60, 
                        211, 
                        133, 
                        230, 
                        220, 
                        105, 
                        92, 
                        41, 
                        55, 
                        46, 
                        245, 
                        40, 
                        244, 
                        102, 
                        143, 
                        54, 
                        65, 
                        25, 
                        63, 
                        161, 
                        1, 
                        216, 
                        80, 
                        73, 
                        209, 
                        76, 
                        132, 
                        187, 
                        208, 
                        89, 
                        18, 
                        169, 
                        200, 
                        196, 
                        135, 
                        130, 
                        116, 
                        188, 
                        159, 
                        86, 
                        164, 
                        100, 
                        109, 
                        198, 
                        173, 
                        186, 
                        3, 
                        64, 
                        52, 
                        217, 
                        226, 
                        250, 
                        124, 
                        123, 
                        5, 
                        202, 
                        38, 
                        147, 
                        118, 
                        126, 
                        255, 
                        82, 
                        85, 
                        212, 
                        207, 
                        206, 
                        59, 
                        227, 
                        47, 
                        16, 
                        58, 
                        17, 
                        182, 
                        189, 
                        28, 
                        42, 
                        223, 
                        183, 
                        170, 
                        213, 
                        119, 
                        248, 
                        152, 
                        2, 
                        44, 
                        154, 
                        163, 
                        70, 
                        221, 
                        153, 
                        101, 
                        155, 
                        167, 
                        43, 
                        172, 
                        9, 
                        129, 
                        22, 
                        39, 
                        253, 
                        19, 
                        98, 
                        108, 
                        110, 
                        79, 
                        113, 
                        224, 
                        232, 
                        178, 
                        185, 
                        112, 
                        104, 
                        218, 
                        246, 
                        97, 
                        228, 
                        251, 
                        34, 
                        242, 
                        193, 
                        238, 
                        210, 
                        144, 
                        12, 
                        191, 
                        179, 
                        162, 
                        241, 
                        81, 
                        51, 
                        145, 
                        235, 
                        249, 
                        14, 
                        239, 
                        107, 
                        49, 
                        192, 
                        214, 
                        31, 
                        181, 
                        199, 
                        106, 
                        157, 
                        184, 
                        84, 
                        204, 
                        176, 
                        115, 
                        121, 
                        50, 
                        45, 
                        127, 
                        4, 
                        150, 
                        254, 
                        138, 
                        236, 
                        205, 
                        93, 
                        222, 
                        114, 
                        67, 
                        29, 
                        24, 
                        72, 
                        243, 
                        141, 
                        128, 
                        195, 
                        78, 
                        66, 
                        215, 
                        61, 
                        156, 
                        180
                    ], System.Int32);
                    this.perm = System.Array.init(512, 0, System.Int32);
                },
                ctor: function () {
                    for (var i = 0; i < 512; i = (i + 1) | 0) {
                        SirFlocksalot.Noise.perm[System.Array.index(i, SirFlocksalot.Noise.perm)] = SirFlocksalot.Noise.p[System.Array.index(i & 255, SirFlocksalot.Noise.p)];
                    }
                }
            },
            methods: {
                fastfloor: function (x) {
                    return x > 0 ? Bridge.Int.clip32(x) : ((Bridge.Int.clip32(x) - 1) | 0);
                },
                dot: function (g, x, y, z) {
                    return g[System.Array.index(0, g)] * x + g[System.Array.index(1, g)] * y + g[System.Array.index(2, g)] * z;
                },
                GetNoise: function (pX, pY, pZ) {
                    var n0, n1, n2, n3;
                    var F3 = 0.33333333333333331;
                    var s = (pX + pY + pZ) * F3;
                    var i = SirFlocksalot.Noise.fastfloor(pX + s);
                    var j = SirFlocksalot.Noise.fastfloor(pY + s);
                    var k = SirFlocksalot.Noise.fastfloor(pZ + s);
                    var G3 = 0.16666666666666666;
                    var t = (((((i + j) | 0) + k) | 0)) * G3;
                    var X0 = i - t;
                    var Y0 = j - t;
                    var Z0 = k - t;
                    var x0 = pX - X0;
                    var y0 = pY - Y0;
                    var z0 = pZ - Z0;
                    var i1, j1, k1;
                    var i2, j2, k2;
                    if (x0 >= y0) {
                        if (y0 >= z0) {
                            i1 = 1;
                            j1 = 0;
                            k1 = 0;
                            i2 = 1;
                            j2 = 1;
                            k2 = 0;
                        } else if (x0 >= z0) {
                            i1 = 1;
                            j1 = 0;
                            k1 = 0;
                            i2 = 1;
                            j2 = 0;
                            k2 = 1;
                        } else {
                            i1 = 0;
                            j1 = 0;
                            k1 = 1;
                            i2 = 1;
                            j2 = 0;
                            k2 = 1;
                        }
                    } else {
                        if (y0 < z0) {
                            i1 = 0;
                            j1 = 0;
                            k1 = 1;
                            i2 = 0;
                            j2 = 1;
                            k2 = 1;
                        } else if (x0 < z0) {
                            i1 = 0;
                            j1 = 1;
                            k1 = 0;
                            i2 = 0;
                            j2 = 1;
                            k2 = 1;
                        } else {
                            i1 = 0;
                            j1 = 1;
                            k1 = 0;
                            i2 = 1;
                            j2 = 1;
                            k2 = 0;
                        }
                    }

                    var x1 = x0 - i1 + G3;
                    var y1 = y0 - j1 + G3;
                    var z1 = z0 - k1 + G3;
                    var x2 = x0 - i2 + 2.0 * G3;
                    var y2 = y0 - j2 + 2.0 * G3;
                    var z2 = z0 - k2 + 2.0 * G3;
                    var x3 = x0 - 1.0 + 3.0 * G3;
                    var y3 = y0 - 1.0 + 3.0 * G3;
                    var z3 = z0 - 1.0 + 3.0 * G3;
                    var ii = i & 255;
                    var jj = j & 255;
                    var kk = k & 255;
                    var gi0 = SirFlocksalot.Noise.perm[System.Array.index(((ii + SirFlocksalot.Noise.perm[System.Array.index(((jj + SirFlocksalot.Noise.perm[System.Array.index(kk, SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)] % 12;
                    var gi1 = SirFlocksalot.Noise.perm[System.Array.index(((((ii + i1) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((((jj + j1) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((kk + k1) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)] % 12;
                    var gi2 = SirFlocksalot.Noise.perm[System.Array.index(((((ii + i2) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((((jj + j2) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((kk + k2) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)] % 12;
                    var gi3 = SirFlocksalot.Noise.perm[System.Array.index(((((ii + 1) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((((jj + 1) | 0) + SirFlocksalot.Noise.perm[System.Array.index(((kk + 1) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)]) | 0), SirFlocksalot.Noise.perm)] % 12;
                    var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;
                    if (t0 < 0) {
                        n0 = 0.0;
                    } else {
                        t0 *= t0;
                        n0 = t0 * t0 * SirFlocksalot.Noise.dot(SirFlocksalot.Noise.grad3[System.Array.index(gi0, SirFlocksalot.Noise.grad3)], x0, y0, z0);
                    }
                    var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;
                    if (t1 < 0) {
                        n1 = 0.0;
                    } else {
                        t1 *= t1;
                        n1 = t1 * t1 * SirFlocksalot.Noise.dot(SirFlocksalot.Noise.grad3[System.Array.index(gi1, SirFlocksalot.Noise.grad3)], x1, y1, z1);
                    }
                    var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;
                    if (t2 < 0) {
                        n2 = 0.0;
                    } else {
                        t2 *= t2;
                        n2 = t2 * t2 * SirFlocksalot.Noise.dot(SirFlocksalot.Noise.grad3[System.Array.index(gi2, SirFlocksalot.Noise.grad3)], x2, y2, z2);
                    }
                    var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;
                    if (t3 < 0) {
                        n3 = 0.0;
                    } else {
                        t3 *= t3;
                        n3 = t3 * t3 * SirFlocksalot.Noise.dot(SirFlocksalot.Noise.grad3[System.Array.index(gi3, SirFlocksalot.Noise.grad3)], x3, y3, z3);
                    }
                    return (32.0 * (n0 + n1 + n2 + n3) + 1) * 0.5;
                }
            }
        }
    });

    Bridge.define("SirFlocksalot.RogueAgent.PastPosition", {
        $kind: "nested class",
        fields: {
            Color: null,
            Position: null
        },
        ctors: {
            init: function () {
                this.Color = new Microsoft.Xna.Framework.Color();
                this.Position = new Microsoft.Xna.Framework.Vector2();
                this.Color = Microsoft.Xna.Framework.Color.White.$clone();
                this.Position = Microsoft.Xna.Framework.Vector2.Zero.$clone();
            }
        }
    });

    Bridge.define("SirFlocksalot.SirFlocksalotGame", {
        inherits: [Microsoft.Xna.Framework.Game],
        statics: {
            fields: {
                ScreenSize: null
            },
            ctors: {
                init: function () {
                    this.ScreenSize = new Microsoft.Xna.Framework.Point();
                    this.ScreenSize = new Microsoft.Xna.Framework.Point.$ctor2(1280, 720);
                }
            }
        },
        fields: {
            graphics: null,
            spriteBatch: null,
            DebugFont: null,
            BackgroundTexture: null,
            RogueTexture: null,
            PetalTextures: null,
            Moon: null,
            Flock: null,
            TimeModifier: 0
        },
        ctors: {
            init: function () {
                this.TimeModifier = 1.0;
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this.IsMouseVisible = true;
                this.graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                this.graphics.PreferredBackBufferWidth = SirFlocksalot.SirFlocksalotGame.ScreenSize.X;
                this.graphics.PreferredBackBufferHeight = SirFlocksalot.SirFlocksalotGame.ScreenSize.Y;
                this.Content.RootDirectory = "Content";
                this.PetalTextures = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Graphics.Texture2D)).ctor();
                this.Moon = new SirFlocksalot.Moon();
                this.Flock = new SirFlocksalot.Flock();
            }
        },
        methods: {
            Initialize: function () {
                Microsoft.Xna.Framework.Game.prototype.Initialize.call(this);
            },
            LoadContent: function () {
                this.spriteBatch = new Microsoft.Xna.Framework.Graphics.SpriteBatch(this.GraphicsDevice);
                this.Moon.Texture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "moon");
                this.BackgroundTexture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "stars");
                this.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "onepx"));
                this.RogueTexture = this.PetalTextures.getItem(0);

                this.Flock.CreateFlock(this.PetalTextures, this.RogueTexture);
            },
            UnloadContent: function () { },
            Update: function (gameTime) {
                if (Microsoft.Xna.Framework.Input.GamePad.GetState(Microsoft.Xna.Framework.PlayerIndex.One).Buttons.Back === Microsoft.Xna.Framework.Input.ButtonState.Pressed || Microsoft.Xna.Framework.Input.Keyboard.GetState().IsKeyDown(Microsoft.Xna.Framework.Input.Keys.Escape)) {
                    this.Exit();
                }
                var DeltaTime = gameTime.ElapsedGameTime.getTotalSeconds();
                var CurrentTime = gameTime.TotalGameTime.getTotalSeconds();
                this.Moon.Update(DeltaTime);
                this.Flock.Update(CurrentTime, DeltaTime, this.TimeModifier);
                Microsoft.Xna.Framework.Game.prototype.Update.call(this, gameTime);
            },
            Draw: function (gameTime) {
                var frameRate = 1 / gameTime.ElapsedGameTime.getTotalSeconds();
                this.GraphicsDevice.Clear(new Microsoft.Xna.Framework.Color.$ctor10(0));
                this.spriteBatch.Begin(Microsoft.Xna.Framework.Graphics.SpriteSortMode.Deferred, Microsoft.Xna.Framework.Graphics.BlendState.NonPremultiplied);
                this.spriteBatch.Draw(this.BackgroundTexture, new Microsoft.Xna.Framework.Rectangle.$ctor2(0, 0, SirFlocksalot.SirFlocksalotGame.ScreenSize.X, SirFlocksalot.SirFlocksalotGame.ScreenSize.Y), Microsoft.Xna.Framework.Color.White.$clone());
                this.Moon.Draw(this.spriteBatch);
                this.Flock.Draw(this.spriteBatch);
                this.spriteBatch.End();

                Microsoft.Xna.Framework.Game.prototype.Draw.call(this, gameTime);
            }
        }
    });

    Bridge.define("SirFlocksalot.Agent", {
        inherits: [SirFlocksalot.GameObject],
        statics: {
            fields: {
                CurrentAgentId: 0
            },
            ctors: {
                init: function () {
                    this.CurrentAgentId = 0;
                }
            }
        },
        fields: {
            Texture: null,
            AgentId: 0,
            IsRogue: false,
            Velocity: null,
            Acceleration: null,
            Orientation: 0,
            MaxForce: 0,
            MaxForceSqared: 0,
            MaxSpeed: 0,
            MaxSpeedSquared: 0,
            MaxTurnRate: 0
        },
        ctors: {
            init: function () {
                this.Velocity = new Microsoft.Xna.Framework.Vector2();
                this.Acceleration = new Microsoft.Xna.Framework.Vector2();
                this.AgentId = 0;
                this.IsRogue = false;
                this.Velocity = Microsoft.Xna.Framework.Vector2.One.$clone();
                this.Acceleration = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                this.Orientation = 0.0;
                this.MaxForce = 5.0;
                this.MaxForceSqared = 0.0;
                this.MaxSpeed = 100.0;
                this.MaxSpeedSquared = 0.0;
                this.MaxTurnRate = 0.628318548;
            },
            ctor: function () {
                var $t;
                this.$initialize();
                SirFlocksalot.GameObject.ctor.call(this);
                this.AgentId = Bridge.identity(SirFlocksalot.Agent.CurrentAgentId, ($t = (SirFlocksalot.Agent.CurrentAgentId + 1) | 0, SirFlocksalot.Agent.CurrentAgentId = $t, $t));
                this.MaxForceSqared = this.MaxForce * this.MaxForce;
                this.MaxSpeedSquared = this.MaxSpeed * this.MaxSpeed;
                this.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(SirFlocksalot.FlockTools.GetRandomFloat(SirFlocksalot.SirFlocksalotGame.ScreenSize.X), SirFlocksalot.FlockTools.GetRandomFloat(SirFlocksalot.SirFlocksalotGame.ScreenSize.Y));
                var QuarterSpeed = this.MaxSpeed * 0.25;
                this.Velocity = SirFlocksalot.FlockTools.GetRandomVector2(-QuarterSpeed, QuarterSpeed, -QuarterSpeed, QuarterSpeed);
                this.Orientation = SirFlocksalot.FlockTools.Heading(this.Velocity);
            }
        },
        methods: {
            Update: function (CurrentTime, DeltaTime, TimeModifier, Agents) {
                SirFlocksalot.FlockTools.Limit(Bridge.ref(this, "Acceleration"), this.MaxForceSqared, this.MaxForce);
                this.Velocity = Microsoft.Xna.Framework.Vector2.op_Addition(this.Velocity.$clone(), this.Acceleration.$clone());
                SirFlocksalot.FlockTools.Limit(Bridge.ref(this, "Velocity"), this.MaxSpeedSquared, this.MaxSpeed);
                if (this.Velocity.LengthSquared() > 1) {
                    this.Orientation = SirFlocksalot.FlockTools.Heading(this.Velocity);
                }
                this.Position = Microsoft.Xna.Framework.Vector2.op_Addition(this.Position.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(this.Velocity.$clone(), DeltaTime));
                SirFlocksalot.FlockTools.WrapVector(Bridge.ref(this, "Position"), SirFlocksalot.SirFlocksalotGame.ScreenSize.ToVector2(), 100);
                this.Acceleration = Microsoft.Xna.Framework.Vector2.op_Multiply$1(this.Acceleration.$clone(), 0.9);
            },
            Draw: function (SB) { },
            Seek: function (Target) {
                var desiredVelocity = Microsoft.Xna.Framework.Vector2.Subtract(Target.$clone(), this.Position.$clone());
                desiredVelocity.Normalize();
                var desiredHeading = SirFlocksalot.FlockTools.Heading(desiredVelocity);
                var headingDiff = desiredHeading - this.Orientation;
                if (headingDiff > Math.PI) {
                    headingDiff = -(Microsoft.Xna.Framework.MathHelper.TwoPi - headingDiff);
                } else if (headingDiff < -3.1415926535897931) {
                    headingDiff = Microsoft.Xna.Framework.MathHelper.TwoPi - Math.abs(headingDiff);
                }
                var turnDelta = Microsoft.Xna.Framework.MathHelper.Clamp$1(headingDiff, -this.MaxTurnRate, this.MaxTurnRate);
                var desire = this.Orientation + turnDelta;
                return new Microsoft.Xna.Framework.Vector2.$ctor2(Math.cos(desire) * this.MaxSpeed, Math.sin(desire) * this.MaxSpeed);
            }
        }
    });

    Bridge.define("SirFlocksalot.Moon", {
        inherits: [SirFlocksalot.GameObject],
        fields: {
            Speed: 0,
            AnchorPosition: null,
            Orientation: 0,
            Texture: null
        },
        ctors: {
            init: function () {
                this.AnchorPosition = new Microsoft.Xna.Framework.Vector2();
                this.Speed = 5E-05;
                this.AnchorPosition = new Microsoft.Xna.Framework.Vector2.$ctor2(1200, 5200);
                this.Orientation = 0.0;
            },
            ctor: function () {
                this.$initialize();
                SirFlocksalot.GameObject.ctor.call(this);
                this.Orientation = 6.063274;
                this.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(this.AnchorPosition.$clone().X + (Math.cos(this.Orientation) + 5100 * Math.sin(this.Orientation)), this.AnchorPosition.$clone().Y + (-5100 * Math.cos(this.Orientation) + Math.sin(this.Orientation)));
            }
        },
        methods: {
            Update: function (DeltaTime) {
                this.Position = new Microsoft.Xna.Framework.Vector2.$ctor2(this.AnchorPosition.$clone().X + (Math.cos(this.Orientation) + 5100 * Math.sin(this.Orientation)), this.AnchorPosition.$clone().Y + (-5100 * Math.cos(this.Orientation) + Math.sin(this.Orientation)));
                this.Orientation = Microsoft.Xna.Framework.MathHelper.WrapAngle(this.Orientation + DeltaTime * this.Speed);
            },
            Draw: function (SB) {
                SB.Draw$6(this.Texture, this.Position.$clone(), this.Texture.Bounds.$clone(), Microsoft.Xna.Framework.Color.White.$clone(), 0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), 1, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
            }
        }
    });

    Bridge.define("SirFlocksalot.FlockAgent", {
        inherits: [SirFlocksalot.Agent],
        fields: {
            NumNeighbors: 0,
            FlockDistance: 0,
            FlockDistanceSqared: 0,
            FlockAngle: 0,
            CohesionWeight: 0,
            SeparationWeight: 0,
            AlignmentWeight: 0,
            PerlinBeat: 0,
            PRadius: 0,
            PTheta: 0,
            POrientation: 0,
            ColorFalloff: 0,
            PetalColor: null,
            DrawPosition: null
        },
        ctors: {
            init: function () {
                this.PetalColor = new Microsoft.Xna.Framework.Color();
                this.DrawPosition = new Microsoft.Xna.Framework.Vector2();
                this.NumNeighbors = 0;
                this.FlockDistance = 0;
                this.FlockDistanceSqared = 0;
                this.FlockAngle = 0;
                this.CohesionWeight = 0;
                this.SeparationWeight = 0;
                this.AlignmentWeight = 0;
                this.PerlinBeat = 0;
                this.PRadius = 50;
                this.PTheta = 0;
                this.POrientation = 0;
                this.ColorFalloff = 0;
                this.PetalColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.DrawPosition = Microsoft.Xna.Framework.Vector2.Zero.$clone();
            },
            ctor: function (AgentTexture) {
                this.$initialize();
                SirFlocksalot.Agent.ctor.call(this);
                this.Texture = AgentTexture;
                this.MaxForce = 10;
                this.MaxForceSqared = this.MaxForce * this.MaxForce;
                this.FlockDistance = 80 + SirFlocksalot.FlockTools.GetRandomFloat(30.0);
                this.FlockDistanceSqared = this.FlockDistance * this.FlockDistance;
                this.FlockAngle = 3.14159274 - SirFlocksalot.FlockTools.GetRandomFloat(1.57079637);
                this.CohesionWeight = 0.3 + SirFlocksalot.FlockTools.GetRandomFloat(0.3) - 0.1;
                this.SeparationWeight = 0.2 + SirFlocksalot.FlockTools.GetRandomFloat(0.25) - 0.1;
                this.AlignmentWeight = 0.3 + SirFlocksalot.FlockTools.GetRandomFloat(0.25) - 0.05;
                this.PTheta = SirFlocksalot.FlockTools.GetRandomFloat(Microsoft.Xna.Framework.MathHelper.TwoPi);
                this.PerlinBeat = SirFlocksalot.FlockTools.GetRandomFloat$1(-0.01, 0.01);
            }
        },
        methods: {
            Update: function (CurrentTime, DeltaTime, TimeModifier, Agents) {
                var mod_DT = DeltaTime * TimeModifier;
                this.UpdateColor(mod_DT);
                var neighbors = this.FindNeighbors(Agents);
                this.Flit(CurrentTime, mod_DT);
                var flockingForce = this.Flock(neighbors);
                this.Acceleration = Microsoft.Xna.Framework.Vector2.op_Addition(this.Acceleration.$clone(), flockingForce.$clone());
                SirFlocksalot.Agent.prototype.Update.call(this, CurrentTime, mod_DT, TimeModifier, Agents);
                var cosTheta = Math.cos(this.PTheta) * this.PRadius;
                var sinTheta = Math.sin(this.PTheta) * this.PRadius;
                this.DrawPosition = Microsoft.Xna.Framework.Vector2.op_Addition(this.Position.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(cosTheta - sinTheta, cosTheta + sinTheta));
            },
            UpdateColor: function (DeltaTime) {
                var AdditiveChange = Bridge.Int.mul((((this.NumNeighbors - 1) | 0)), 20) * DeltaTime;
                this.ColorFalloff = Microsoft.Xna.Framework.MathHelper.Clamp$1(this.ColorFalloff + AdditiveChange, 0, 200);
                var RGBValue = (Bridge.Int.clip32(this.ColorFalloff) + 55) | 0;
                this.PetalColor = new Microsoft.Xna.Framework.Color.$ctor7(RGBValue, RGBValue, RGBValue, 255);
            },
            FindNeighbors: function (Agents) {
                var $t;
                var nearby = new (System.Collections.Generic.List$1(SirFlocksalot.Agent)).ctor();
                var a1 = -this.FlockAngle;
                var a2 = this.FlockAngle;
                var dir = SirFlocksalot.FlockTools.GetSafeNormal(this.Velocity.$clone());
                $t = Bridge.getEnumerator(Agents);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;
                        if (this.AgentId !== a.AgentId) {
                            var toNeighbor = Microsoft.Xna.Framework.Vector2.Subtract(a.Position.$clone(), this.Position.$clone());
                            var dsq = toNeighbor.LengthSquared();
                            if (dsq < this.FlockDistanceSqared) {
                                toNeighbor.Normalize();
                                var dotProduct = Microsoft.Xna.Framework.Vector2.Dot(dir.$clone(), toNeighbor.$clone());
                                var theta = Math.acos(dotProduct);
                                if (theta < this.FlockAngle) {
                                    nearby.add(a);
                                }
                            }
                        }
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                this.NumNeighbors = nearby.Count;
                return nearby;
            },
            Flit: function (CurrentTime, DeltaTime) {
                this.PerlinBeat = Microsoft.Xna.Framework.MathHelper.Clamp$1(this.PerlinBeat + SirFlocksalot.FlockTools.GetRandomFloat$1(-0.05, 0.05), -1.0, 1.0);
                var perlinR = (SirFlocksalot.Noise.GetNoise(CurrentTime * 100, 0, 0)) * DeltaTime * this.PerlinBeat;
                this.PTheta = Microsoft.Xna.Framework.MathHelper.WrapAngle(this.PTheta + perlinR);
                this.POrientation += perlinR;
            },
            Flock: function (Neighbors) {
                var $t;
                if (Neighbors.Count === 0) {
                    return Microsoft.Xna.Framework.Vector2.Zero.$clone();
                }
                var steer = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var alignment = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var separation = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var cohesion = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                var cv = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                $t = Bridge.getEnumerator(Neighbors);
                try {
                    while ($t.moveNext()) {
                        var a = $t.Current;
                        var distSq = Microsoft.Xna.Framework.Vector2.DistanceSquared(this.Position.$clone(), a.Position.$clone());
                        var t = SirFlocksalot.FlockTools.Map(distSq, 0, this.FlockDistanceSqared, 1, 0);
                        var dir = Microsoft.Xna.Framework.Vector2.Multiply$1(a.Velocity.$clone(), t);
                        if (a.IsRogue) {
                            steer = Microsoft.Xna.Framework.Vector2.op_Addition(steer.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(this.Seek(Microsoft.Xna.Framework.Vector2.op_Addition(a.Position.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(a.Velocity.$clone(), 10))), this.CohesionWeight));
                            return steer.$clone();
                        }
                        alignment = Microsoft.Xna.Framework.Vector2.op_Addition(alignment.$clone(), dir.$clone());
                        var sep = Microsoft.Xna.Framework.Vector2.Subtract(this.Position.$clone(), a.Position.$clone());
                        var r = sep.LengthSquared();
                        sep.Normalize();
                        sep = Microsoft.Xna.Framework.Vector2.op_Multiply$1(sep.$clone(), 1.0 / r);
                        separation = Microsoft.Xna.Framework.Vector2.op_Addition(separation.$clone(), sep.$clone());
                        cv = Microsoft.Xna.Framework.Vector2.op_Addition(cv.$clone(), a.Position.$clone());
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                alignment = Microsoft.Xna.Framework.Vector2.op_Division$1(alignment.$clone(), Neighbors.Count);
                alignment.Normalize();
                steer = Microsoft.Xna.Framework.Vector2.op_Addition(steer.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(alignment.$clone(), this.AlignmentWeight));

                cv = Microsoft.Xna.Framework.Vector2.op_Division$1(cv.$clone(), Neighbors.Count);
                cohesion = this.Seek(cv.$clone());
                cohesion.Normalize();
                steer = Microsoft.Xna.Framework.Vector2.op_Addition(steer.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(cohesion.$clone(), this.CohesionWeight));

                separation.Normalize();
                steer = Microsoft.Xna.Framework.Vector2.op_Addition(steer.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(separation.$clone(), this.SeparationWeight));
                return steer.$clone();
            },
            Draw: function (SB) {
                SB.Draw$5(this.Texture, this.DrawPosition.$clone(), this.Texture.Bounds.$clone(), this.PetalColor.$clone(), this.POrientation * Microsoft.Xna.Framework.MathHelper.TwoPi, Microsoft.Xna.Framework.Vector2.One.$clone(), new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
            }
        }
    });

    Bridge.define("SirFlocksalot.RogueAgent", {
        inherits: [SirFlocksalot.Agent],
        fields: {
            WanderStrength: 0,
            WanderAmp: 0,
            WanderDistance: 0,
            WanderRadius: 0,
            WanderRate: 0,
            WanderTheta: 0,
            WanderDelta: 0,
            SeekStrength: 0,
            DilationDistance: 0,
            DilationDistanceSquared: 0,
            Past: null,
            Target: null,
            FlowForce: null,
            TargetObject: null,
            IsSeeking: false
        },
        ctors: {
            init: function () {
                this.Target = new Microsoft.Xna.Framework.Vector2();
                this.FlowForce = new Microsoft.Xna.Framework.Vector2();
                this.WanderStrength = 10;
                this.WanderAmp = 15000;
                this.WanderDistance = 100;
                this.WanderRadius = 0;
                this.WanderRate = 0.01;
                this.WanderTheta = 0;
                this.WanderDelta = 0;
                this.SeekStrength = 2;
                this.DilationDistance = 150;
                this.DilationDistanceSquared = 0;
                this.Past = new (System.Collections.Generic.List$1(SirFlocksalot.RogueAgent.PastPosition)).ctor();
                this.Target = new Microsoft.Xna.Framework.Vector2.$ctor2(200, 200);
                this.FlowForce = Microsoft.Xna.Framework.Vector2.Zero.$clone();
                this.IsSeeking = false;
            },
            ctor: function (inTexture) {
                this.$initialize();
                SirFlocksalot.Agent.ctor.call(this);
                this.IsRogue = true;
                this.MaxForce = 15.0;
                this.MaxSpeed = 250.0;
                this.MaxForceSqared = this.MaxForce * this.MaxForce;
                this.MaxSpeedSquared = this.MaxSpeed * this.MaxSpeed;
                this.DilationDistanceSquared = this.DilationDistance * this.DilationDistance;
                this.WanderRadius = this.WanderDistance * 1.25;
                this.Texture = inTexture;
            }
        },
        methods: {
            Update: function (CurrentTime, DeltaTime, TimeModifier, Agents) {
                this.Acceleration = Microsoft.Xna.Framework.Vector2.op_Addition(this.Acceleration.$clone(), this.FlowForce.$clone());
                this.RogueSeek();
                this.Wander(CurrentTime, DeltaTime);
                this.CreateHistory();
                SirFlocksalot.Agent.prototype.Update.call(this, CurrentTime, DeltaTime, TimeModifier, Agents);
            },
            RogueSeek: function () {
                if (this.IsSeeking) {
                    this.Target = this.TargetObject != null ? this.TargetObject.Position : Microsoft.Xna.Framework.Vector2.Zero;
                    var seekVector = this.Seek(this.Target.$clone());
                    seekVector.Normalize();
                    seekVector = Microsoft.Xna.Framework.Vector2.op_Multiply$1(seekVector.$clone(), this.SeekStrength);
                    this.Acceleration = Microsoft.Xna.Framework.Vector2.op_Addition(this.Acceleration.$clone(), seekVector.$clone());
                }
            },
            CreateHistory: function () {
                var $t;
                for (var i = (this.Past.Count - 1) | 0; i >= 0; i = (i - 1) | 0) {
                    this.Past.getItem(i).Color.A = (this.Past.getItem(i).Color.A - 15) & 255;
                    if (this.Past.getItem(i).Color.A < 5) {
                        this.Past.removeAt(i);
                    }
                }
                this.Past.add(($t = new SirFlocksalot.RogueAgent.PastPosition(), $t.Position = Microsoft.Xna.Framework.Vector2.op_Addition(this.Position.$clone(), SirFlocksalot.FlockTools.GetRandomVector2(-2, 2, -2, 2)), $t.Color = Microsoft.Xna.Framework.Color.White.$clone(), $t));
            },
            Wander: function (CurrentTime, DeltaTime) {
                var forward_target = new Microsoft.Xna.Framework.Vector2.$ctor2(Math.cos(this.Orientation), Math.sin(this.Orientation));
                forward_target = Microsoft.Xna.Framework.Vector2.op_Multiply$1(forward_target.$clone(), this.WanderDistance);

                this.WanderDelta = Microsoft.Xna.Framework.MathHelper.Clamp$1(this.WanderDelta + SirFlocksalot.FlockTools.GetRandomFloat$1(-1, 1), -10, 10);
                var value = SirFlocksalot.Noise.GetNoise(CurrentTime * this.WanderDelta * this.WanderRate, 0, 0) * this.WanderAmp;
                this.WanderTheta += Microsoft.Xna.Framework.MathHelper.WrapAngle(this.WanderTheta + value * DeltaTime);

                var x = this.WanderRadius * Math.cos(this.WanderTheta) - this.WanderRadius * Math.sin(this.WanderTheta);
                var y = this.WanderRadius * Math.cos(this.WanderTheta) + this.WanderRadius * Math.sin(this.WanderTheta);

                var wander_target = new Microsoft.Xna.Framework.Vector2.$ctor2(forward_target.X + x, forward_target.Y + y);
                wander_target.Normalize();
                this.Acceleration = Microsoft.Xna.Framework.Vector2.op_Addition(this.Acceleration.$clone(), Microsoft.Xna.Framework.Vector2.op_Multiply$1(wander_target.$clone(), this.WanderStrength));
            },
            Draw: function (SB) {
                var $t;
                $t = Bridge.getEnumerator(this.Past);
                try {
                    while ($t.moveNext()) {
                        var p = $t.Current;
                        SB.Draw$3(this.Texture, p.Position.$clone(), p.Color.$clone());
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
            }
        }
    });
});

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VkU2lyRmxvY2tzYWxvdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiR2FtZS9TaXJGbG9ja3NhbG90R2FtZS5jcyIsIkdhbWUvRmxvY2suY3MiLCJHYW1lL0Zsb2NrVG9vbHMuY3MiLCJHYW1lL0Zsb2NrQWdlbnQuY3MiLCJHYW1lL01vb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFVWUEsYUFBYUE7WUFDYkEsZUFBZUEsQ0FBTUE7WUFDckJBLGdCQUFnQkEsQ0FBTUE7WUFDdEJBO1lBQ0FBLDBCQUFxRUE7Ozs7WUFTckVBLGdDQUFPQSxJQUFJQTtZQUNYQTs7Ozs7Ozs7Ozs7Ozs7OztnQ0Nmc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkNBTEEsS0FBSUE7Ozs7Ozs7bUNBRURBLGVBQStCQTtnQkFFbkRBLEtBQUtBLFdBQVdBLElBQUlBLDhCQUFVQTtvQkFFMUJBLGdCQUFXQSxJQUFJQSx5QkFBV0EsMEVBQTJCQTs7Z0JBRXpEQSxLQUFLQSxZQUFXQSxLQUFJQSw4QkFBVUE7b0JBRTFCQSxnQkFBV0EsSUFBSUEseUJBQVdBOzs7OEJBSWZBLGFBQW1CQSxXQUFpQkE7O2dCQUVuREEsMEJBQW9CQTs7Ozt3QkFFaEJBLFNBQVNBLGFBQWFBLFdBQVdBLGNBQWNBOzs7Ozs7Ozs0QkFHdENBOztnQkFFYkEsMEJBQW9CQTs7Ozt3QkFFaEJBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDMUJZQSxJQUFJQTs7OzswQ0FDSUE7b0JBRS9CQSxPQUFPQSxBQUFPQSxtREFBMEJBOzs0Q0FFVEEsS0FBV0E7b0JBRTFDQSxlQUFpQkEsQUFBT0EsU0FBU0EsT0FBT0EsQUFBT0EsU0FBU0E7b0JBQ3hEQSxPQUFPQSxBQUFPQSxtREFBMEJBLFdBQVdBOzsrQkFFL0JBLE9BQWFBLFlBQWtCQSxVQUFnQkEsWUFBa0JBO29CQUVyRkEsT0FBT0EsQ0FBQ0EsUUFB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Y2tzYWxvdDtcclxuXHJcbm5hbWVzcGFjZSBCcmlkZ2VkU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgQXBwXHJcbiAgICB7XHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgR2FtZSBnYW1lO1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBNYWluKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBjYW52YXMgPSBuZXcgUmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgY2FudmFzLndpZHRoID0gKHVpbnQpU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5YO1xyXG4gICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gKHVpbnQpU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5ZO1xyXG4gICAgICAgICAgICBjYW52YXMuaWQgPSBcIm1vbm9nYW1lY2FudmFzXCI7XHJcbiAgICAgICAgICAgIFJldHlwZWQuZG9tLmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQ8UmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQ+KGNhbnZhcyk7XHJcblxyXG4gICAgICAgICAgICAvL2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobmV3IEhUTUxCUkVsZW1lbnQoKSk7XHJcblxyXG4gICAgICAgICAgICAvL3ZhciBjYW4gPSBuZXcgSFRNTENhbnZhc0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgLy9jYW4ud2lkdGggPSA4MDA7XHJcbiAgICAgICAgICAgIC8vY2FuLmhlaWdodCA9IDEwMjQ7XHJcbiAgICAgICAgICAgIC8vZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjYW4pO1xyXG5cclxuICAgICAgICAgICAgZ2FtZSA9IG5ldyBTaXJGbG9ja3NhbG90R2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCgpIHsgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFNpckZsb2Nrc2Fsb3RHYW1lIDogR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUG9pbnQgU2NyZWVuU2l6ZSA9IG5ldyBQb2ludCgxMjgwLCA3MjApO1xyXG4gICAgICAgIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBncmFwaGljcztcclxuICAgICAgICBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaDtcclxuICAgICAgICBTcHJpdGVGb250IERlYnVnRm9udDtcclxuICAgICAgICBUZXh0dXJlMkQgQmFja2dyb3VuZFRleHR1cmU7XHJcbiAgICAgICAgVGV4dHVyZTJEIFJvZ3VlVGV4dHVyZTtcclxuICAgICAgICBMaXN0PFRleHR1cmUyRD4gUGV0YWxUZXh0dXJlcztcclxuICAgICAgICBNb29uIE1vb247XHJcbiAgICAgICAgRmxvY2sgRmxvY2s7XHJcbiAgICAgICAgZmxvYXQgVGltZU1vZGlmaWVyID0gMS4wZjtcclxuICAgICAgICBwdWJsaWMgU2lyRmxvY2tzYWxvdEdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNNb3VzZVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IFNjcmVlblNpemUuWDtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IFNjcmVlblNpemUuWTtcclxuICAgICAgICAgICAgLy9Jc0ZpeGVkVGltZVN0ZXAgPSBncmFwaGljcy5TeW5jaHJvbml6ZVdpdGhWZXJ0aWNhbFJldHJhY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcbiAgICAgICAgICAgIFBldGFsVGV4dHVyZXMgPSBuZXcgTGlzdDxUZXh0dXJlMkQ+KCk7XHJcbiAgICAgICAgICAgIE1vb24gPSBuZXcgTW9vbigpO1xyXG4gICAgICAgICAgICBGbG9jayA9IG5ldyBGbG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIC8vRGVidWdGb250ID0gQ29udGVudC5Mb2FkPFNwcml0ZUZvbnQ+KFwiRm9udHMvRGVidWdcIik7XHJcbiAgICAgICAgICAgIE1vb24uVGV4dHVyZSA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwibW9vblwiKTtcclxuICAgICAgICAgICAgQmFja2dyb3VuZFRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInN0YXJzXCIpO1xyXG4gICAgICAgICAgICBQZXRhbFRleHR1cmVzLkFkZChDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm9uZXB4XCIpKTtcclxuICAgICAgICAgICAgLy8gUGV0YWxUZXh0dXJlcy5BZGQoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJwZXRhbC1ibHVlXCIpKTtcclxuICAgICAgICAgICAgLy9QZXRhbFRleHR1cmVzLkFkZChDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInBldGFsLXllbGxvd1wiKSk7XHJcbiAgICAgICAgICAgIFJvZ3VlVGV4dHVyZSA9IFBldGFsVGV4dHVyZXNbMF07Ly9Db250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInJvZ3VlXCIpO1xyXG4gICAgICAgICAgICAvLyBQb3N0IENvbnRlbnQgTG9hZGluZ1xyXG5cclxuICAgICAgICAgICAgRmxvY2suQ3JlYXRlRmxvY2soUGV0YWxUZXh0dXJlcywgUm9ndWVUZXh0dXJlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVW5sb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoR2FtZVBhZC5HZXRTdGF0ZShQbGF5ZXJJbmRleC5PbmUpLkJ1dHRvbnMuQmFjayA9PSBCdXR0b25TdGF0ZS5QcmVzc2VkIHx8IEtleWJvYXJkLkdldFN0YXRlKCkuSXNLZXlEb3duKEtleXMuRXNjYXBlKSlcclxuICAgICAgICAgICAgICAgIEV4aXQoKTtcclxuICAgICAgICAgICAgZmxvYXQgRGVsdGFUaW1lID0gKGZsb2F0KWdhbWVUaW1lLkVsYXBzZWRHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIGZsb2F0IEN1cnJlbnRUaW1lID0gKGZsb2F0KWdhbWVUaW1lLlRvdGFsR2FtZVRpbWUuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICBNb29uLlVwZGF0ZShEZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBGbG9jay5VcGRhdGUoQ3VycmVudFRpbWUsIERlbHRhVGltZSwgVGltZU1vZGlmaWVyKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVJhdGUgPSAxIC8gKGZsb2F0KWdhbWVUaW1lLkVsYXBzZWRHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKG5ldyBDb2xvcigwKSk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKFNwcml0ZVNvcnRNb2RlLkRlZmVycmVkLCBCbGVuZFN0YXRlLk5vblByZW11bHRpcGxpZWQpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KEJhY2tncm91bmRUZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIFNjcmVlblNpemUuWCwgU2NyZWVuU2l6ZS5ZKSwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgICAgICBNb29uLkRyYXcoc3ByaXRlQmF0Y2gpO1xyXG4gICAgICAgICAgICBGbG9jay5EcmF3KHNwcml0ZUJhdGNoKTtcclxuICAgICAgICAgICAgLy9zcHJpdGVCYXRjaC5EcmF3U3RyaW5nKERlYnVnRm9udCwgc3RyaW5nLkZvcm1hdChcInswfSAoRlBTKVwiLCBmcmFtZVJhdGUpLCBuZXcgVmVjdG9yMigxMCwgMTApLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkVuZCgpO1xyXG5cclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZsb2NrXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBpbnQgTnVtRmxvY2sgPSA0NztcclxuICAgICAgICBzdGF0aWMgcHVibGljIGludCBOdW1Sb2d1ZSA9IDM7XHJcbiAgICAgICAgTGlzdDxBZ2VudD4gQWdlbnRzID0gbmV3IExpc3Q8QWdlbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIEZsb2NrKCkgeyB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgQ3JlYXRlRmxvY2soTGlzdDxUZXh0dXJlMkQ+IFBldGFsVGV4dHVyZXMsIFRleHR1cmUyRCBSb2d1ZVRleHR1cmUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IE51bUZsb2NrOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFnZW50cy5BZGQobmV3IEZsb2NrQWdlbnQoRmxvY2tUb29scy5QaWNrPFRleHR1cmUyRD4oUGV0YWxUZXh0dXJlcykpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IE51bVJvZ3VlOyBpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEFnZW50cy5BZGQobmV3IFJvZ3VlQWdlbnQoUm9ndWVUZXh0dXJlKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYS5VcGRhdGUoQ3VycmVudFRpbWUsIERlbHRhVGltZSwgVGltZU1vZGlmaWVyLCBBZ2VudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYS5EcmF3KFNCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHN0YXRpYyBjbGFzcyBGbG9ja1Rvb2xzXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIFJhbmRvbSBSYW5kb21pemVyID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgZmxvYXQgR2V0UmFuZG9tRmxvYXQoZmxvYXQgVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KVJhbmRvbWl6ZXIuTmV4dERvdWJsZSgpICogVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgZmxvYXQgR2V0UmFuZG9tRmxvYXQoZmxvYXQgTWluLCBmbG9hdCBNYXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBBYnNUb3RhbCA9IChmbG9hdClNYXRoLkFicyhNaW4pICsgKGZsb2F0KU1hdGguQWJzKE1heCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpUmFuZG9taXplci5OZXh0RG91YmxlKCkgKiBBYnNUb3RhbCArIE1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBNYXAoZmxvYXQgdmFsdWUsIGZsb2F0IGZyb21Tb3VyY2UsIGZsb2F0IHRvU291cmNlLCBmbG9hdCBmcm9tVGFyZ2V0LCBmbG9hdCB0b1RhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgLSBmcm9tU291cmNlKSAvICh0b1NvdXJjZSAtIGZyb21Tb3VyY2UpICogKHRvVGFyZ2V0IC0gZnJvbVRhcmdldCkgKyBmcm9tVGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTGltaXQocmVmIFZlY3RvcjIgVmVjdG9yLCBmbG9hdCBMaW1pdFNxdWFyZWQsIGZsb2F0IExpbWl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5MZW5ndGhTcXVhcmVkKCkgPiBMaW1pdFNxdWFyZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIFZlY3RvciA9IFZlY3RvciAqIExpbWl0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgSGVhZGluZyh0aGlzIFZlY3RvcjIgVmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLkF0YW4yKFZlY3Rvci5ZLCBWZWN0b3IuWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBHZXRTYWZlTm9ybWFsKFZlY3RvcjIgVmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoVmVjdG9yLkxlbmd0aFNxdWFyZWQoKSA+IDAuMDFmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5Ob3JtYWxpemUoVmVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUGljazxUPihMaXN0PFQ+IE9wdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoT3B0aW9ucy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcHRpb25zW1JhbmRvbWl6ZXIuTmV4dChPcHRpb25zLkNvdW50KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgV3JhcFZlY3RvcihyZWYgVmVjdG9yMiBWZWN0b3IsIFZlY3RvcjIgQm91bmRzLCBmbG9hdCBFcnJvclRvbGVyYW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IFJpZ2h0ID0gQm91bmRzLlggKyBFcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgZmxvYXQgTGVmdCA9IC1FcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5YID4gUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWCA9IExlZnQ7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKFZlY3Rvci5YIDwgTGVmdClcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5YID0gUmlnaHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IFRvcCA9IC1FcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgZmxvYXQgQm90dG9tID0gQm91bmRzLlkgKyBFcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5ZID4gQm90dG9tKVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlkgPSBUb3A7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKFZlY3Rvci5ZIDwgVG9wKVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlkgPSBCb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEdldFJhbmRvbUludGVnZXIoaW50IE1heFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJhbmRvbWl6ZXIuTmV4dChNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgVmVjdG9yMiBHZXRSYW5kb21WZWN0b3IyKGZsb2F0IE1pblgsIGZsb2F0IE1heFgsIGZsb2F0IE1pblksIGZsb2F0IE1heFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoR2V0UmFuZG9tRmxvYXQoTWluWCwgTWF4WCksIEdldFJhbmRvbUZsb2F0KE1pblksIE1heFkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE5vaXNlXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5vaXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgNTEyOyBpKyspXHJcbiAgICAgICAgICAgICAgICBwZXJtW2ldID0gcFtpICYgMjU1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2ltcGxleCBub2lzZSBpbiAyRCwgM0QgYW5kIDREXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W11bXSBncmFkMyA9IG5ldyBpbnRbXVtdIHtcclxuICAgICAgICBuZXcgaW50W10gezEsMSwwfSwgbmV3IGludFtdIHstMSwxLDB9LCBuZXcgaW50W10gezEsLTEsMH0sIG5ldyBpbnRbXSB7LTEsLTEsMH0sXHJcbiAgICAgICAgbmV3IGludFtdIHsxLDAsMX0sIG5ldyBpbnRbXSB7LTEsMCwxfSwgbmV3IGludFtdIHsxLDAsLTF9LCBuZXcgaW50W10gey0xLDAsLTF9LFxyXG4gICAgICAgIG5ldyBpbnRbXSB7MCwxLDF9LCBuZXcgaW50W10gezAsLTEsMX0sIG5ldyBpbnRbXSB7MCwxLC0xfSwgbmV3IGludFtdIHswLC0xLC0xfVxyXG4gICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W10gcCA9IHsxNTEsMTYwLDEzNyw5MSw5MCwxNSxcclxuICAgICAgICAxMzEsMTMsMjAxLDk1LDk2LDUzLDE5NCwyMzMsNywyMjUsMTQwLDM2LDEwMywzMCw2OSwxNDIsOCw5OSwzNywyNDAsMjEsMTAsMjMsXHJcbiAgICAgICAgMTkwLCA2LDE0OCwyNDcsMTIwLDIzNCw3NSwwLDI2LDE5Nyw2Miw5NCwyNTIsMjE5LDIwMywxMTcsMzUsMTEsMzIsNTcsMTc3LDMzLFxyXG4gICAgICAgIDg4LDIzNywxNDksNTYsODcsMTc0LDIwLDEyNSwxMzYsMTcxLDE2OCwgNjgsMTc1LDc0LDE2NSw3MSwxMzQsMTM5LDQ4LDI3LDE2NixcclxuICAgICAgICA3NywxNDYsMTU4LDIzMSw4MywxMTEsMjI5LDEyMiw2MCwyMTEsMTMzLDIzMCwyMjAsMTA1LDkyLDQxLDU1LDQ2LDI0NSw0MCwyNDQsXHJcbiAgICAgICAgMTAyLDE0Myw1NCwgNjUsMjUsNjMsMTYxLCAxLDIxNiw4MCw3MywyMDksNzYsMTMyLDE4NywyMDgsIDg5LDE4LDE2OSwyMDAsMTk2LFxyXG4gICAgICAgIDEzNSwxMzAsMTE2LDE4OCwxNTksODYsMTY0LDEwMCwxMDksMTk4LDE3MywxODYsIDMsNjQsNTIsMjE3LDIyNiwyNTAsMTI0LDEyMyxcclxuICAgICAgICA1LDIwMiwzOCwxNDcsMTE4LDEyNiwyNTUsODIsODUsMjEyLDIwNywyMDYsNTksMjI3LDQ3LDE2LDU4LDE3LDE4MiwxODksMjgsNDIsXHJcbiAgICAgICAgMjIzLDE4MywxNzAsMjEzLDExOSwyNDgsMTUyLCAyLDQ0LDE1NCwxNjMsIDcwLDIyMSwxNTMsMTAxLDE1NSwxNjcsIDQzLDE3Miw5LFxyXG4gICAgICAgIDEyOSwyMiwzOSwyNTMsIDE5LDk4LDEwOCwxMTAsNzksMTEzLDIyNCwyMzIsMTc4LDE4NSwgMTEyLDEwNCwyMTgsMjQ2LDk3LDIyOCxcclxuICAgICAgICAyNTEsMzQsMjQyLDE5MywyMzgsMjEwLDE0NCwxMiwxOTEsMTc5LDE2MiwyNDEsIDgxLDUxLDE0NSwyMzUsMjQ5LDE0LDIzOSwxMDcsXHJcbiAgICAgICAgNDksMTkyLDIxNCwgMzEsMTgxLDE5OSwxMDYsMTU3LDE4NCwgODQsMjA0LDE3NiwxMTUsMTIxLDUwLDQ1LDEyNywgNCwxNTAsMjU0LFxyXG4gICAgICAgIDEzOCwyMzYsMjA1LDkzLDIyMiwxMTQsNjcsMjksMjQsNzIsMjQzLDE0MSwxMjgsMTk1LDc4LDY2LDIxNSw2MSwxNTYsMTgwfTtcclxuICAgICAgICAvLyBUbyByZW1vdmUgdGhlIG5lZWQgZm9yIGluZGV4IHdyYXBwaW5nLCBkb3VibGUgdGhlIHBlcm11dGF0aW9uIHRhYmxlIGxlbmd0aFxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludFtdIHBlcm0gPSBuZXcgaW50WzUxMl07XHJcblxyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGEgKmxvdCogZmFzdGVyIHRoYW4gdXNpbmcgKGludClNYXRoLmZsb29yKHgpXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGZhc3RmbG9vcihkb3VibGUgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID4gMCA/IChpbnQpeCA6IChpbnQpeCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgZG90KGludFtdIGcsIGRvdWJsZSB4LCBkb3VibGUgeSwgZG91YmxlIHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZ1swXSAqIHggKyBnWzFdICogeSArIGdbMl0gKiB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBHZXROb2lzZShkb3VibGUgcFgsIGRvdWJsZSBwWSwgZG91YmxlIHBaKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG91YmxlIG4wLCBuMSwgbjIsIG4zOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZvdXIgY29ybmVyc1xyXG4gICAgICAgICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXHJcbiAgICAgICAgICAgIGRvdWJsZSBGMyA9IDEuMCAvIDMuMDtcclxuICAgICAgICAgICAgZG91YmxlIHMgPSAocFggKyBwWSArIHBaKSAqIEYzOyAvLyBWZXJ5IG5pY2UgYW5kIHNpbXBsZSBza2V3IGZhY3RvciBmb3IgM0RcclxuICAgICAgICAgICAgaW50IGkgPSBmYXN0Zmxvb3IocFggKyBzKTtcclxuICAgICAgICAgICAgaW50IGogPSBmYXN0Zmxvb3IocFkgKyBzKTtcclxuICAgICAgICAgICAgaW50IGsgPSBmYXN0Zmxvb3IocFogKyBzKTtcclxuICAgICAgICAgICAgZG91YmxlIEczID0gMS4wIC8gNi4wOyAvLyBWZXJ5IG5pY2UgYW5kIHNpbXBsZSB1bnNrZXcgZmFjdG9yLCB0b29cclxuICAgICAgICAgICAgZG91YmxlIHQgPSAoaSArIGogKyBrKSAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseikgc3BhY2VcclxuICAgICAgICAgICAgZG91YmxlIFkwID0gaiAtIHQ7XHJcbiAgICAgICAgICAgIGRvdWJsZSBaMCA9IGsgLSB0O1xyXG4gICAgICAgICAgICBkb3VibGUgeDAgPSBwWCAtIFgwOyAvLyBUaGUgeCx5LHogZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MCA9IHBZIC0gWTA7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MCA9IHBaIC0gWjA7XHJcbiAgICAgICAgICAgIC8vIEZvciB0aGUgM0QgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYSBzbGlnaHRseSBpcnJlZ3VsYXIgdGV0cmFoZWRyb24uXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cclxuICAgICAgICAgICAgaW50IGkxLCBqMSwgazE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgICAgICBpbnQgaTIsIGoyLCBrMjsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcclxuICAgICAgICAgICAgaWYgKHgwID49IHkwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeTAgPj0gejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFggWSBaIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4MCA+PSB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWCBaIFkgb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWiBYIFkgb3JkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHsgLy8geDA8eTBcclxuICAgICAgICAgICAgICAgIGlmICh5MCA8IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBaIFkgWCBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeDAgPCB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWSBaIFggb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMDtcclxuICAgICAgICAgICAgICAgIH0gLy8gWSBYIFogb3JkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jLC1jKSBpbiAoeCx5LHopLFxyXG4gICAgICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcclxuICAgICAgICAgICAgLy8gYSBzdGVwIG9mICgwLDAsMSkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLC1jLDEtYykgaW4gKHgseSx6KSwgd2hlcmVcclxuICAgICAgICAgICAgLy8gYyA9IDEvNi5cclxuXHJcbiAgICAgICAgICAgIGRvdWJsZSB4MSA9IHgwIC0gaTEgKyBHMzsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xyXG4gICAgICAgICAgICBkb3VibGUgeTEgPSB5MCAtIGoxICsgRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MSA9IHowIC0gazEgKyBHMztcclxuICAgICAgICAgICAgZG91YmxlIHgyID0geDAgLSBpMiArIDIuMCAqIEczOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcclxuICAgICAgICAgICAgZG91YmxlIHkyID0geTAgLSBqMiArIDIuMCAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgejIgPSB6MCAtIGsyICsgMi4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB4MyA9IHgwIC0gMS4wICsgMy4wICogRzM7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkseikgY29vcmRzXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MyA9IHkwIC0gMS4wICsgMy4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MyA9IHowIC0gMS4wICsgMy4wICogRzM7XHJcbiAgICAgICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgZm91ciBzaW1wbGV4IGNvcm5lcnNcclxuICAgICAgICAgICAgaW50IGlpID0gaSAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGpqID0gaiAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGtrID0gayAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGdpMCA9IHBlcm1baWkgKyBwZXJtW2pqICsgcGVybVtra11dXSAlIDEyO1xyXG4gICAgICAgICAgICBpbnQgZ2kxID0gcGVybVtpaSArIGkxICsgcGVybVtqaiArIGoxICsgcGVybVtrayArIGsxXV1dICUgMTI7XHJcbiAgICAgICAgICAgIGludCBnaTIgPSBwZXJtW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazJdXV0gJSAxMjtcclxuICAgICAgICAgICAgaW50IGdpMyA9IHBlcm1baWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMV1dXSAlIDEyO1xyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcclxuICAgICAgICAgICAgZG91YmxlIHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowO1xyXG4gICAgICAgICAgICBpZiAodDAgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjAgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDAgKj0gdDA7XHJcbiAgICAgICAgICAgICAgICBuMCA9IHQwICogdDAgKiBkb3QoZ3JhZDNbZ2kwXSwgeDAsIHkwLCB6MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQxID0gMC42IC0geDEgKiB4MSAtIHkxICogeTEgLSB6MSAqIHoxO1xyXG4gICAgICAgICAgICBpZiAodDEgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjEgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDEgKj0gdDE7XHJcbiAgICAgICAgICAgICAgICBuMSA9IHQxICogdDEgKiBkb3QoZ3JhZDNbZ2kxXSwgeDEsIHkxLCB6MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyO1xyXG4gICAgICAgICAgICBpZiAodDIgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjIgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDIgKj0gdDI7XHJcbiAgICAgICAgICAgICAgICBuMiA9IHQyICogdDIgKiBkb3QoZ3JhZDNbZ2kyXSwgeDIsIHkyLCB6Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozO1xyXG4gICAgICAgICAgICBpZiAodDMgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjMgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDMgKj0gdDM7XHJcbiAgICAgICAgICAgICAgICBuMyA9IHQzICogdDMgKiBkb3QoZ3JhZDNbZ2kzXSwgeDMsIHkzLCB6Myk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxyXG4gICAgICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byBzdGF5IGp1c3QgaW5zaWRlIFstMSwgMV0gLSBub3cgWzAsIDFdXHJcbiAgICAgICAgICAgIHJldHVybiAoMzIuMGYgKiAoZmxvYXQpKG4wICsgbjEgKyBuMiArIG4zKSArIDEpICogMC41ZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3RcclxueyAgICBcclxuICAgIHB1YmxpYyBjbGFzcyBBZ2VudCA6IEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgaW50IEN1cnJlbnRBZ2VudElkID0gMDtcclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIFRleHR1cmUyRCBUZXh0dXJlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQWdlbnRJZCA9IDA7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNSb2d1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFZlbG9jaXR5ID0gVmVjdG9yMi5PbmU7XHJcbiAgICAgICAgcHJvdGVjdGVkIFZlY3RvcjIgQWNjZWxlcmF0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBPcmllbnRhdGlvbiA9IDAuMGY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heEZvcmNlID0gNWY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heEZvcmNlU3FhcmVkID0gMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4U3BlZWQgPSAxMDAuMGY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heFNwZWVkU3F1YXJlZCA9IDAuMGY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heFR1cm5SYXRlID0gMC42MjgzMTg1NDhGO1xyXG5cclxuXHJcbiAgICAgICAgcHVibGljIEFnZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFnZW50SWQgPSBDdXJyZW50QWdlbnRJZCsrO1xyXG4gICAgICAgICAgICBNYXhGb3JjZVNxYXJlZCA9IE1heEZvcmNlICogTWF4Rm9yY2U7XHJcbiAgICAgICAgICAgIE1heFNwZWVkU3F1YXJlZCA9IE1heFNwZWVkICogTWF4U3BlZWQ7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uID0gbmV3IFZlY3RvcjIoRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdChTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlgpLCBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KFNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuWSkpO1xyXG4gICAgICAgICAgICBmbG9hdCBRdWFydGVyU3BlZWQgPSBNYXhTcGVlZCAqIDAuMjVmO1xyXG4gICAgICAgICAgICBWZWxvY2l0eSA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tVmVjdG9yMigtUXVhcnRlclNwZWVkLCBRdWFydGVyU3BlZWQsIC1RdWFydGVyU3BlZWQsIFF1YXJ0ZXJTcGVlZCk7XHJcbiAgICAgICAgICAgIE9yaWVudGF0aW9uID0gVmVsb2NpdHkuSGVhZGluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIsIExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZsb2NrVG9vbHMuTGltaXQocmVmIEFjY2VsZXJhdGlvbiwgTWF4Rm9yY2VTcWFyZWQsIE1heEZvcmNlKTtcclxuICAgICAgICAgICAgVmVsb2NpdHkgKz0gQWNjZWxlcmF0aW9uO1xyXG4gICAgICAgICAgICBGbG9ja1Rvb2xzLkxpbWl0KHJlZiBWZWxvY2l0eSwgTWF4U3BlZWRTcXVhcmVkLCBNYXhTcGVlZCk7XHJcbiAgICAgICAgICAgIGlmKFZlbG9jaXR5Lkxlbmd0aFNxdWFyZWQoKSA+IDEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIE9yaWVudGF0aW9uID0gVmVsb2NpdHkuSGVhZGluZygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFBvc2l0aW9uICs9IFZlbG9jaXR5ICogRGVsdGFUaW1lO1xyXG4gICAgICAgICAgICBGbG9ja1Rvb2xzLldyYXBWZWN0b3IocmVmIFBvc2l0aW9uLCBTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlRvVmVjdG9yMigpLCAxMDApO1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKj0gMC45ZjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKSB7IH1cclxuICAgICAgICBwcm90ZWN0ZWQgVmVjdG9yMiBTZWVrKFZlY3RvcjIgVGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBkZXNpcmVkVmVsb2NpdHkgPSBWZWN0b3IyLlN1YnRyYWN0KFRhcmdldCwgUG9zaXRpb24pO1xyXG4gICAgICAgICAgICBkZXNpcmVkVmVsb2NpdHkuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGRlc2lyZWRIZWFkaW5nID0gZGVzaXJlZFZlbG9jaXR5LkhlYWRpbmcoKTtcclxuICAgICAgICAgICAgZmxvYXQgaGVhZGluZ0RpZmYgPSBkZXNpcmVkSGVhZGluZyAtIE9yaWVudGF0aW9uO1xyXG4gICAgICAgICAgICBpZihoZWFkaW5nRGlmZiA+IE1hdGguUEkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlYWRpbmdEaWZmID0gLShNYXRoSGVscGVyLlR3b1BpIC0gaGVhZGluZ0RpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKGhlYWRpbmdEaWZmIDwgLU1hdGguUEkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlYWRpbmdEaWZmID0gTWF0aEhlbHBlci5Ud29QaSAtIChmbG9hdClNYXRoLkFicyhoZWFkaW5nRGlmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmxvYXQgdHVybkRlbHRhID0gTWF0aEhlbHBlci5DbGFtcChoZWFkaW5nRGlmZiwgLU1heFR1cm5SYXRlLCBNYXhUdXJuUmF0ZSk7XHJcbiAgICAgICAgICAgIGZsb2F0IGRlc2lyZSA9IE9yaWVudGF0aW9uICsgdHVybkRlbHRhOyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoKGZsb2F0KU1hdGguQ29zKGRlc2lyZSkgKiBNYXhTcGVlZCwgKGZsb2F0KU1hdGguU2luKGRlc2lyZSkgKiBNYXhTcGVlZCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIEZsb2NrQWdlbnQgOiBBZ2VudFxyXG4gICAgeyAgICAgICAgXHJcbiAgICAgICAgaW50IE51bU5laWdoYm9ycyA9IDA7XHJcbiAgICAgICAgZmxvYXQgRmxvY2tEaXN0YW5jZSA9IDA7XHJcbiAgICAgICAgZmxvYXQgRmxvY2tEaXN0YW5jZVNxYXJlZCA9IDA7XHJcbiAgICAgICAgZmxvYXQgRmxvY2tBbmdsZSA9IDA7XHJcbiAgICAgICAgZmxvYXQgQ29oZXNpb25XZWlnaHQgPSAwO1xyXG4gICAgICAgIGZsb2F0IFNlcGFyYXRpb25XZWlnaHQgPSAwO1xyXG4gICAgICAgIGZsb2F0IEFsaWdubWVudFdlaWdodCA9IDA7XHJcbiAgICAgICAgZmxvYXQgUGVybGluQmVhdCA9IDA7XHJcbiAgICAgICAgZmxvYXQgUFJhZGl1cyA9IDUwO1xyXG4gICAgICAgIGZsb2F0IFBUaGV0YSA9IDA7XHJcbiAgICAgICAgZmxvYXQgUE9yaWVudGF0aW9uID0gMDtcclxuICAgICAgICBmbG9hdCBDb2xvckZhbGxvZmYgPSAwO1xyXG4gICAgICAgIENvbG9yIFBldGFsQ29sb3IgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICBWZWN0b3IyIERyYXdQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwdWJsaWMgRmxvY2tBZ2VudChUZXh0dXJlMkQgQWdlbnRUZXh0dXJlKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dHVyZSA9IEFnZW50VGV4dHVyZTtcclxuICAgICAgICAgICAgTWF4Rm9yY2UgPSAxMDtcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBGbG9ja0Rpc3RhbmNlID0gODAgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KDMwLjBmKTtcclxuICAgICAgICAgICAgRmxvY2tEaXN0YW5jZVNxYXJlZCA9IEZsb2NrRGlzdGFuY2UgKiBGbG9ja0Rpc3RhbmNlO1xyXG4gICAgICAgICAgICBGbG9ja0FuZ2xlID0gKGZsb2F0KU1hdGguUEkgLSBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KChmbG9hdClNYXRoLlBJICogMC41Zik7XHJcbiAgICAgICAgICAgIENvaGVzaW9uV2VpZ2h0ID0gMC4zZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4zZikgLSAwLjFmO1xyXG4gICAgICAgICAgICBTZXBhcmF0aW9uV2VpZ2h0ID0gMC4yZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4yNWYpIC0gMC4xZjtcclxuICAgICAgICAgICAgQWxpZ25tZW50V2VpZ2h0ID0gMC4zZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4yNWYpIC0gMC4wNWY7XHJcbiAgICAgICAgICAgIFBUaGV0YSA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoTWF0aEhlbHBlci5Ud29QaSk7XHJcbiAgICAgICAgICAgIFBlcmxpbkJlYXQgPSBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KC0wLjAxZiwgMC4wMWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBtb2RfRFQgPSBEZWx0YVRpbWUgKiBUaW1lTW9kaWZpZXI7XHJcbiAgICAgICAgICAgIFVwZGF0ZUNvbG9yKG1vZF9EVCk7XHJcbiAgICAgICAgICAgIExpc3Q8QWdlbnQ+IG5laWdoYm9ycyA9IEZpbmROZWlnaGJvcnMoQWdlbnRzKTtcclxuICAgICAgICAgICAgRmxpdChDdXJyZW50VGltZSwgbW9kX0RUKTtcclxuICAgICAgICAgICAgVmVjdG9yMiBmbG9ja2luZ0ZvcmNlID0gRmxvY2sobmVpZ2hib3JzKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSBmbG9ja2luZ0ZvcmNlOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKEN1cnJlbnRUaW1lLCBtb2RfRFQsIFRpbWVNb2RpZmllciwgQWdlbnRzKTtcclxuICAgICAgICAgICAgZmxvYXQgY29zVGhldGEgPSAoZmxvYXQpTWF0aC5Db3MoUFRoZXRhKSAqIFBSYWRpdXM7XHJcbiAgICAgICAgICAgIGZsb2F0IHNpblRoZXRhID0gKGZsb2F0KU1hdGguU2luKFBUaGV0YSkgKiBQUmFkaXVzO1xyXG4gICAgICAgICAgICBEcmF3UG9zaXRpb24gPSBQb3NpdGlvbiArIG5ldyBWZWN0b3IyKGNvc1RoZXRhIC0gc2luVGhldGEsIGNvc1RoZXRhICsgc2luVGhldGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2b2lkIFVwZGF0ZUNvbG9yKGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IEFkZGl0aXZlQ2hhbmdlID0gKE51bU5laWdoYm9ycyAtIDEpICogMjAgKiBEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIENvbG9yRmFsbG9mZiA9IE1hdGhIZWxwZXIuQ2xhbXAoQ29sb3JGYWxsb2ZmICsgQWRkaXRpdmVDaGFuZ2UsIDAsIDIwMCk7XHJcbiAgICAgICAgICAgIGludCBSR0JWYWx1ZSA9IChpbnQpQ29sb3JGYWxsb2ZmICsgNTU7XHJcbiAgICAgICAgICAgIFBldGFsQ29sb3IgPSBuZXcgQ29sb3IoUkdCVmFsdWUsIFJHQlZhbHVlLCBSR0JWYWx1ZSwgMjU1KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEFnZW50PiBGaW5kTmVpZ2hib3JzKExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8QWdlbnQ+IG5lYXJieSA9IG5ldyBMaXN0PEFnZW50PigpO1xyXG4gICAgICAgICAgICBmbG9hdCBhMSA9IC1GbG9ja0FuZ2xlO1xyXG4gICAgICAgICAgICBmbG9hdCBhMiA9IEZsb2NrQW5nbGU7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGlyID0gRmxvY2tUb29scy5HZXRTYWZlTm9ybWFsKFZlbG9jaXR5KTtcclxuICAgICAgICAgICAgZm9yZWFjaChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoQWdlbnRJZCAhPSBhLkFnZW50SWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiB0b05laWdoYm9yID0gVmVjdG9yMi5TdWJ0cmFjdChhLlBvc2l0aW9uLCBQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgZHNxID0gdG9OZWlnaGJvci5MZW5ndGhTcXVhcmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZHNxIDwgRmxvY2tEaXN0YW5jZVNxYXJlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvTmVpZ2hib3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSBWZWN0b3IyLkRvdChkaXIsIHRvTmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aGV0YSA9IChmbG9hdClNYXRoLkFjb3MoZG90UHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoZXRhIDwgRmxvY2tBbmdsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5LkFkZChhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOdW1OZWlnaGJvcnMgPSBuZWFyYnkuQ291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBuZWFyYnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEZsaXQoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vUE9yaWVudGF0aW9uID0gTWF0aEhlbHBlci5XcmFwQW5nbGUoUE9yaWVudGF0aW9uKTtcclxuICAgICAgICAgICAgUGVybGluQmVhdCA9IE1hdGhIZWxwZXIuQ2xhbXAoUGVybGluQmVhdCArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTAuMDVmLCAwLjA1ZiksIC0xZiwgMWYpO1xyXG4gICAgICAgICAgICBmbG9hdCBwZXJsaW5SID0gKE5vaXNlLkdldE5vaXNlKEN1cnJlbnRUaW1lICogMTAwLCAwLCAwKSkgKiBEZWx0YVRpbWUgKiBQZXJsaW5CZWF0O1xyXG4gICAgICAgICAgICBQVGhldGEgPSBNYXRoSGVscGVyLldyYXBBbmdsZShQVGhldGEgKyBwZXJsaW5SKTtcclxuICAgICAgICAgICAgUE9yaWVudGF0aW9uICs9IHBlcmxpblI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlY3RvcjIgRmxvY2soTGlzdDxBZ2VudD4gTmVpZ2hib3JzKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKE5laWdoYm9ycy5Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBzdGVlciA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBhbGlnbm1lbnQgPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgc2VwYXJhdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBjb2hlc2lvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBjdiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgZm9yZWFjaChBZ2VudCBhIGluIE5laWdoYm9ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgZGlzdFNxID0gVmVjdG9yMi5EaXN0YW5jZVNxdWFyZWQoUG9zaXRpb24sIGEuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdCA9IEZsb2NrVG9vbHMuTWFwKGRpc3RTcSwgMCwgRmxvY2tEaXN0YW5jZVNxYXJlZCwgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIGRpciA9IFZlY3RvcjIuTXVsdGlwbHkoYS5WZWxvY2l0eSwgdCk7XHJcbiAgICAgICAgICAgICAgICBpZihhLklzUm9ndWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlZXIgKz0gU2VlayhhLlBvc2l0aW9uICsgYS5WZWxvY2l0eSAqIDEwKSAqIENvaGVzaW9uV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsaWdubWVudCArPSBkaXI7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHNlcCA9IFZlY3RvcjIuU3VidHJhY3QoUG9zaXRpb24sIGEuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgciA9IHNlcC5MZW5ndGhTcXVhcmVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXAuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzZXAgKj0gMS4wZiAvIHI7XHJcbiAgICAgICAgICAgICAgICBzZXBhcmF0aW9uICs9IHNlcDtcclxuICAgICAgICAgICAgICAgIGN2ICs9IGEuUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxpZ25tZW50IC89IE5laWdoYm9ycy5Db3VudDtcclxuICAgICAgICAgICAgYWxpZ25tZW50Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBhbGlnbm1lbnQgKiBBbGlnbm1lbnRXZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjdiAvPSBOZWlnaGJvcnMuQ291bnQ7XHJcbiAgICAgICAgICAgIGNvaGVzaW9uID0gU2Vlayhjdik7XHJcbiAgICAgICAgICAgIGNvaGVzaW9uLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBjb2hlc2lvbiAqIENvaGVzaW9uV2VpZ2h0O1xyXG5cclxuICAgICAgICAgICAgc2VwYXJhdGlvbi5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc3RlZXIgKz0gc2VwYXJhdGlvbiAqIFNlcGFyYXRpb25XZWlnaHQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGVlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgRHJhd1Bvc2l0aW9uLCBUZXh0dXJlLkJvdW5kcywgUGV0YWxDb2xvciwgUE9yaWVudGF0aW9uICogTWF0aEhlbHBlci5Ud29QaSwgVmVjdG9yMi5PbmUsIG5ldyBWZWN0b3IyKDAuNWYsIDAuNWYpLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBSb2d1ZUFnZW50IDogQWdlbnRcclxuICAgIHtcclxuICAgICAgICBjbGFzcyBQYXN0UG9zaXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb2xvciBDb2xvciA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMiBQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICB9XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyU3RyZW5ndGggPSAxMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJBbXAgPSAxNTAwMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJEaXN0YW5jZSA9IDEwMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJSYWRpdXMgPSAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlclJhdGUgPSAwLjAxZjtcclxuICAgICAgICBmbG9hdCBXYW5kZXJUaGV0YSA9IDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyRGVsdGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFNlZWtTdHJlbmd0aCA9IDI7XHJcbiAgICAgICAgZmxvYXQgRGlsYXRpb25EaXN0YW5jZSA9IDE1MDtcclxuICAgICAgICBmbG9hdCBEaWxhdGlvbkRpc3RhbmNlU3F1YXJlZCA9IDA7XHJcbiAgICAgICAgTGlzdDxQYXN0UG9zaXRpb24+IFBhc3QgPSBuZXcgTGlzdDxQYXN0UG9zaXRpb24+KCk7XHJcbiAgICAgICAgVmVjdG9yMiBUYXJnZXQgPSBuZXcgVmVjdG9yMigyMDAsIDIwMCk7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgRmxvd0ZvcmNlID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIEdhbWVPYmplY3QgVGFyZ2V0T2JqZWN0ID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgUm9ndWVBZ2VudChUZXh0dXJlMkQgaW5UZXh0dXJlKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNSb2d1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIE1heEZvcmNlID0gMTVmO1xyXG4gICAgICAgICAgICBNYXhTcGVlZCA9IDI1MC4wZjtcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBNYXhTcGVlZFNxdWFyZWQgPSBNYXhTcGVlZCAqIE1heFNwZWVkO1xyXG4gICAgICAgICAgICBEaWxhdGlvbkRpc3RhbmNlU3F1YXJlZCA9IERpbGF0aW9uRGlzdGFuY2UgKiBEaWxhdGlvbkRpc3RhbmNlO1xyXG4gICAgICAgICAgICBXYW5kZXJSYWRpdXMgPSBXYW5kZXJEaXN0YW5jZSAqIDEuMjVmO1xyXG4gICAgICAgICAgICBUZXh0dXJlID0gaW5UZXh0dXJlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gRmxvd0ZvcmNlO1xyXG4gICAgICAgICAgICBSb2d1ZVNlZWsoKTtcclxuICAgICAgICAgICAgV2FuZGVyKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBDcmVhdGVIaXN0b3J5KCk7XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUsIFRpbWVNb2RpZmllciwgQWdlbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSb2d1ZVNlZWsoKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoSXNTZWVraW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYXJnZXQgPSBUYXJnZXRPYmplY3QgIT0gbnVsbCA/IFRhcmdldE9iamVjdC5Qb3NpdGlvbiA6IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc2Vla1ZlY3RvciA9IFNlZWsoVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNlZWtWZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzZWVrVmVjdG9yICo9IFNlZWtTdHJlbmd0aDtcclxuICAgICAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSBzZWVrVmVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGlzdG9yeSgpXHJcbiAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IFBhc3QuQ291bnQgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUGFzdFtpXS5Db2xvci5BIC09IDE1O1xyXG4gICAgICAgICAgICAgICAgaWYgKFBhc3RbaV0uQ29sb3IuQSA8IDUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFzdC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvL2lmIChQYXN0LkNvdW50ID4gMClcclxuICAgICAgICAgICAgLy97XHJcbiAgICAgICAgICAgIC8vICAgIGludCBpbmRleCA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tSW50ZWdlcihQYXN0LkNvdW50KTtcclxuICAgICAgICAgICAgLy8gICAgQ29sb3IgUGlja2VkQ29sb3IgPSBGbG9ja1Rvb2xzLlBpY2sobmV3IExpc3Q8Q29sb3I+IHsgQ29sb3IuRGFya1NlYUdyZWVuLCBDb2xvci5EYXJrVHVycXVvaXNlLCBDb2xvci5EYXJrUmVkLCBDb2xvci5MaWdodFllbGxvdywgQ29sb3IuV2hpdGUsIENvbG9yLkZsb3JhbFdoaXRlIH0pICogMC41ZjtcclxuICAgICAgICAgICAgLy8gICAgUGlja2VkQ29sb3IuQSA9IFBhc3RbaW5kZXhdLkNvbG9yLkE7XHJcbiAgICAgICAgICAgIC8vICAgIFBhc3RbaW5kZXhdLkNvbG9yID0gUGlja2VkQ29sb3I7XHJcbiAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICBQYXN0LkFkZChuZXcgUGFzdFBvc2l0aW9uKCkgeyBQb3NpdGlvbiA9IFBvc2l0aW9uICsgRmxvY2tUb29scy5HZXRSYW5kb21WZWN0b3IyKC0yLCAyLCAtMiwgMiksIENvbG9yID0gQ29sb3IuV2hpdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFdhbmRlcihmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBmb3J3YXJkX3RhcmdldCA9IG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbiksIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpO1xyXG4gICAgICAgICAgICBmb3J3YXJkX3RhcmdldCAqPSBXYW5kZXJEaXN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIFdhbmRlckRlbHRhID0gTWF0aEhlbHBlci5DbGFtcChXYW5kZXJEZWx0YSArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTEsIDEpLCAtMTAsIDEwKTtcclxuICAgICAgICAgICAgZmxvYXQgdmFsdWUgPSBOb2lzZS5HZXROb2lzZShDdXJyZW50VGltZSAqIFdhbmRlckRlbHRhICogV2FuZGVyUmF0ZSwgMCwgMCkgKiBXYW5kZXJBbXA7XHJcbiAgICAgICAgICAgIFdhbmRlclRoZXRhICs9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKFdhbmRlclRoZXRhICsgdmFsdWUgKiBEZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgeCA9IFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLkNvcyhXYW5kZXJUaGV0YSkgLSBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5TaW4oV2FuZGVyVGhldGEpO1xyXG4gICAgICAgICAgICBmbG9hdCB5ID0gV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguQ29zKFdhbmRlclRoZXRhKSArIFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLlNpbihXYW5kZXJUaGV0YSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIHdhbmRlcl90YXJnZXQgPSBuZXcgVmVjdG9yMihmb3J3YXJkX3RhcmdldC5YICsgeCwgZm9yd2FyZF90YXJnZXQuWSArIHkpO1xyXG4gICAgICAgICAgICB3YW5kZXJfdGFyZ2V0Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gd2FuZGVyX3RhcmdldCAqIFdhbmRlclN0cmVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaChQYXN0UG9zaXRpb24gcCBpbiBQYXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTQi5EcmF3KFRleHR1cmUsIHAuUG9zaXRpb24sIHAuQ29sb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIE1vb24gOiBHYW1lT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcmVhZG9ubHkgZmxvYXQgU3BlZWQgPSAwLjAwMDA1ZjtcclxuICAgICAgICByZWFkb25seSBWZWN0b3IyIEFuY2hvclBvc2l0aW9uID0gbmV3IFZlY3RvcjIoMTIwMCwgNTIwMCk7XHJcbiAgICAgICAgZmxvYXQgT3JpZW50YXRpb24gPSAwLjBmOyAgICAgICAgXHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBUZXh0dXJlO1xyXG5cclxuICAgICAgICBwdWJsaWMgTW9vbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IChmbG9hdClNYXRoLlBJICogMS45M2Y7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uID0gbmV3IFZlY3RvcjIoQW5jaG9yUG9zaXRpb24uWCArICgoZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pICsgNTEwMCooZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSwgQW5jaG9yUG9zaXRpb24uWSArICgtNTEwMCooZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pICsgKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMihBbmNob3JQb3NpdGlvbi5YICsgKChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyA1MTAwICogKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSksIEFuY2hvclBvc2l0aW9uLlkgKyAoLTUxMDAgKiAoZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pICsgKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSkpO1xyXG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKE9yaWVudGF0aW9uICsgRGVsdGFUaW1lICogU3BlZWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU0IuRHJhdyhUZXh0dXJlLCBQb3NpdGlvbiwgVGV4dHVyZS5Cb3VuZHMsIENvbG9yLldoaXRlLCAwLCBuZXcgVmVjdG9yMigwLjVmLCAwLjVmKSwgMSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl0KfQo=
