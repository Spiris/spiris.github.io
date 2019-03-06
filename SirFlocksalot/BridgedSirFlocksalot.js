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
                SB.Draw$6(this.Texture, this.DrawPosition.$clone(), this.Texture.Bounds.$clone(), this.PetalColor.$clone(), this.POrientation * Microsoft.Xna.Framework.MathHelper.TwoPi, new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), 16.0, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
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
                    this.Past.getItem(i).Color.A = (this.Past.getItem(i).Color.A - 5) & 255;
                    if (this.Past.getItem(i).Color.A < 5) {
                        this.Past.removeAt(i);
                    }
                }
                if (this.Past.Count > 0) {
                    var index = SirFlocksalot.FlockTools.GetRandomInteger(this.Past.Count);
                    var PickedColor = Microsoft.Xna.Framework.Color.op_Multiply(SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Color, function (_o1) {
                            _o1.add(Microsoft.Xna.Framework.Color.DarkSeaGreen.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.DarkTurquoise.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.DarkRed.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.LightYellow.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.White.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.FloralWhite.$clone());
                            return _o1;
                        }(new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Color)).ctor())), 0.5);
                    PickedColor.A = this.Past.getItem(index).Color.A;
                    this.Past.getItem(index).Color = PickedColor.$clone();
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
                        SB.Draw$6(this.Texture, p.Position.$clone(), this.Texture.Bounds.$clone(), p.Color.$clone(), 0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), 3.0, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VkU2lyRmxvY2tzYWxvdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiR2FtZS9TaXJGbG9ja3NhbG90R2FtZS5jcyIsIkdhbWUvRmxvY2suY3MiLCJHYW1lL0Zsb2NrVG9vbHMuY3MiLCJHYW1lL0Zsb2NrQWdlbnQuY3MiLCJHYW1lL01vb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFVWUEsYUFBYUE7WUFDYkEsZUFBZUEsQ0FBTUE7WUFDckJBLGdCQUFnQkEsQ0FBTUE7WUFDdEJBO1lBQ0FBLDBCQUFxRUE7Ozs7WUFTckVBLGdDQUFPQSxJQUFJQTtZQUNYQTs7Ozs7Ozs7Ozs7Ozs7OztnQ0Nmc0JBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs4QkNBTEEsS0FBSUE7Ozs7Ozs7bUNBRURBLGVBQStCQTtnQkFFbkRBLEtBQUtBLFdBQVdBLElBQUlBLDhCQUFVQTtvQkFFMUJBLGdCQUFXQSxJQUFJQSx5QkFBV0EsMEVBQTJCQTs7Z0JBRXpEQSxLQUFLQSxZQUFXQSxLQUFJQSw4QkFBVUE7b0JBRTFCQSxnQkFBV0EsSUFBSUEseUJBQVdBOzs7OEJBSWZBLGFBQW1CQSxXQUFpQkE7O2dCQUVuREEsMEJBQW9CQTs7Ozt3QkFFaEJBLFNBQVNBLGFBQWFBLFdBQVdBLGNBQWNBOzs7Ozs7Ozs0QkFHdENBOztnQkFFYkEsMEJBQW9CQTs7Ozt3QkFFaEJBLE9BQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NDMUJZQSxJQUFJQTs7OzswQ0FDSUE7b0JBRS9CQSxPQUFPQSxBQUFPQSxtREFBMEJBOzs0Q0FFVEEsS0FBV0E7b0JBRTFDQSxlQUFpQkEsQUFBT0EsU0FBU0EsT0FBT0EsQUFBT0EsU0FBU0E7b0JBQ3hEQSxPQUFPQSxBQUFPQSxtREFBMEJBLFdBQVdBOzsrQkFFL0JBLE9BQWFBLFlBQWtCQSxVQUFnQkEsWUFBa0JBO29CQUVyRkEsT0FBT0EsQ0FBQ0EsUUFB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QUFPQSxTQUFTQTs7Z0JBRXZGQSxvQkFBd0JBLElBQUlBLHVDQUFRQSxtQkFBbUJBLEdBQUdBLG1CQUFtQkE7Z0JBQzdFQTtnQkFDQUEsNEZBQWdCQSxzRUFBZ0JBOzs0QkFFVkE7O2dCQUV0QkEsMEJBQTBCQTs7Ozt3QkFFdEJBLFVBQVFBLGNBQVNBLHFCQUFZQSw4QkFBZ0JBLHFCQUFZQSxJQUFJQSx1REFBMkJBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTaXJGbG9ja3NhbG90O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZWRTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lIGdhbWU7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSAodWludClTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlg7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAodWludClTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5pZCA9IFwibW9ub2dhbWVjYW52YXNcIjtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudD4oY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIC8vZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChuZXcgSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIC8vdmFyIGNhbiA9IG5ldyBIVE1MQ2FudmFzRWxlbWVudCgpO1xyXG4gICAgICAgICAgICAvL2Nhbi53aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgLy9jYW4uaGVpZ2h0ID0gMTAyNDtcclxuICAgICAgICAgICAgLy9kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbik7XHJcblxyXG4gICAgICAgICAgICBnYW1lID0gbmV3IFNpckZsb2Nrc2Fsb3RHYW1lKCk7XHJcbiAgICAgICAgICAgIGdhbWUuUnVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5JbnB1dDtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIFBvc2l0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIHB1YmxpYyBHYW1lT2JqZWN0KCkgeyB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgU2lyRmxvY2tzYWxvdEdhbWUgOiBHYW1lXHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBQb2ludCBTY3JlZW5TaXplID0gbmV3IFBvaW50KDEyODAsIDcyMCk7XHJcbiAgICAgICAgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyIGdyYXBoaWNzO1xyXG4gICAgICAgIFNwcml0ZUJhdGNoIHNwcml0ZUJhdGNoO1xyXG4gICAgICAgIFNwcml0ZUZvbnQgRGVidWdGb250O1xyXG4gICAgICAgIFRleHR1cmUyRCBCYWNrZ3JvdW5kVGV4dHVyZTtcclxuICAgICAgICBUZXh0dXJlMkQgUm9ndWVUZXh0dXJlO1xyXG4gICAgICAgIExpc3Q8VGV4dHVyZTJEPiBQZXRhbFRleHR1cmVzO1xyXG4gICAgICAgIE1vb24gTW9vbjtcclxuICAgICAgICBGbG9jayBGbG9jaztcclxuICAgICAgICBmbG9hdCBUaW1lTW9kaWZpZXIgPSAxLjBmO1xyXG4gICAgICAgIHB1YmxpYyBTaXJGbG9ja3NhbG90R2FtZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJc01vdXNlVmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzID0gbmV3IEdyYXBoaWNzRGV2aWNlTWFuYWdlcih0aGlzKTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlcldpZHRoID0gU2NyZWVuU2l6ZS5YO1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVySGVpZ2h0ID0gU2NyZWVuU2l6ZS5ZO1xyXG4gICAgICAgICAgICAvL0lzRml4ZWRUaW1lU3RlcCA9IGdyYXBoaWNzLlN5bmNocm9uaXplV2l0aFZlcnRpY2FsUmV0cmFjZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBDb250ZW50LlJvb3REaXJlY3RvcnkgPSBcIkNvbnRlbnRcIjtcclxuICAgICAgICAgICAgUGV0YWxUZXh0dXJlcyA9IG5ldyBMaXN0PFRleHR1cmUyRD4oKTtcclxuICAgICAgICAgICAgTW9vbiA9IG5ldyBNb29uKCk7XHJcbiAgICAgICAgICAgIEZsb2NrID0gbmV3IEZsb2NrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIEluaXRpYWxpemUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYmFzZS5Jbml0aWFsaXplKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIExvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoID0gbmV3IFNwcml0ZUJhdGNoKEdyYXBoaWNzRGV2aWNlKTtcclxuICAgICAgICAgICAgLy9EZWJ1Z0ZvbnQgPSBDb250ZW50LkxvYWQ8U3ByaXRlRm9udD4oXCJGb250cy9EZWJ1Z1wiKTtcclxuICAgICAgICAgICAgTW9vbi5UZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJtb29uXCIpO1xyXG4gICAgICAgICAgICBCYWNrZ3JvdW5kVGV4dHVyZSA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwic3RhcnNcIik7XHJcbiAgICAgICAgICAgIFBldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwib25lcHhcIikpO1xyXG4gICAgICAgICAgICAvLyBQZXRhbFRleHR1cmVzLkFkZChDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInBldGFsLWJsdWVcIikpO1xyXG4gICAgICAgICAgICAvL1BldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicGV0YWwteWVsbG93XCIpKTtcclxuICAgICAgICAgICAgUm9ndWVUZXh0dXJlID0gUGV0YWxUZXh0dXJlc1swXTsvL0NvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicm9ndWVcIik7XHJcbiAgICAgICAgICAgIC8vIFBvc3QgQ29udGVudCBMb2FkaW5nXHJcblxyXG4gICAgICAgICAgICBGbG9jay5DcmVhdGVGbG9jayhQZXRhbFRleHR1cmVzLCBSb2d1ZVRleHR1cmUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVbmxvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVwZGF0ZShHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChHYW1lUGFkLkdldFN0YXRlKFBsYXllckluZGV4Lk9uZSkuQnV0dG9ucy5CYWNrID09IEJ1dHRvblN0YXRlLlByZXNzZWQgfHwgS2V5Ym9hcmQuR2V0U3RhdGUoKS5Jc0tleURvd24oS2V5cy5Fc2NhcGUpKVxyXG4gICAgICAgICAgICAgICAgRXhpdCgpO1xyXG4gICAgICAgICAgICBmbG9hdCBEZWx0YVRpbWUgPSAoZmxvYXQpZ2FtZVRpbWUuRWxhcHNlZEdhbWVUaW1lLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgZmxvYXQgQ3VycmVudFRpbWUgPSAoZmxvYXQpZ2FtZVRpbWUuVG90YWxHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIE1vb24uVXBkYXRlKERlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIEZsb2NrLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIpO1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lUmF0ZSA9IDEgLyAoZmxvYXQpZ2FtZVRpbWUuRWxhcHNlZEdhbWVUaW1lLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgR3JhcGhpY3NEZXZpY2UuQ2xlYXIobmV3IENvbG9yKDApKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guQmVnaW4oU3ByaXRlU29ydE1vZGUuRGVmZXJyZWQsIEJsZW5kU3RhdGUuTm9uUHJlbXVsdGlwbGllZCk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoQmFja2dyb3VuZFRleHR1cmUsIG5ldyBSZWN0YW5nbGUoMCwgMCwgU2NyZWVuU2l6ZS5YLCBTY3JlZW5TaXplLlkpLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIE1vb24uRHJhdyhzcHJpdGVCYXRjaCk7XHJcbiAgICAgICAgICAgIEZsb2NrLkRyYXcoc3ByaXRlQmF0Y2gpO1xyXG4gICAgICAgICAgICAvL3Nwcml0ZUJhdGNoLkRyYXdTdHJpbmcoRGVidWdGb250LCBzdHJpbmcuRm9ybWF0KFwiezB9IChGUFMpXCIsIGZyYW1lUmF0ZSksIG5ldyBWZWN0b3IyKDEwLCAxMCksIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRW5kKCk7XHJcblxyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgRmxvY2tcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgcHVibGljIGludCBOdW1GbG9jayA9IDQ3O1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgaW50IE51bVJvZ3VlID0gMztcclxuICAgICAgICBMaXN0PEFnZW50PiBBZ2VudHMgPSBuZXcgTGlzdDxBZ2VudD4oKTtcclxuICAgICAgICBwdWJsaWMgRmxvY2soKSB7IH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBDcmVhdGVGbG9jayhMaXN0PFRleHR1cmUyRD4gUGV0YWxUZXh0dXJlcywgVGV4dHVyZTJEIFJvZ3VlVGV4dHVyZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgTnVtRmxvY2s7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWdlbnRzLkFkZChuZXcgRmxvY2tBZ2VudChGbG9ja1Rvb2xzLlBpY2s8VGV4dHVyZTJEPihQZXRhbFRleHR1cmVzKSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgTnVtUm9ndWU7IGkrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgQWdlbnRzLkFkZChuZXcgUm9ndWVBZ2VudChSb2d1ZVRleHR1cmUpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIsIEFnZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhLkRyYXcoU0IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgc3RhdGljIGNsYXNzIEZsb2NrVG9vbHNcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgUmFuZG9tIFJhbmRvbWl6ZXIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBmbG9hdCBHZXRSYW5kb21GbG9hdChmbG9hdCBWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpUmFuZG9taXplci5OZXh0RG91YmxlKCkgKiBWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBmbG9hdCBHZXRSYW5kb21GbG9hdChmbG9hdCBNaW4sIGZsb2F0IE1heClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IEFic1RvdGFsID0gKGZsb2F0KU1hdGguQWJzKE1pbikgKyAoZmxvYXQpTWF0aC5BYnMoTWF4KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClSYW5kb21pemVyLk5leHREb3VibGUoKSAqIEFic1RvdGFsICsgTWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IE1hcChmbG9hdCB2YWx1ZSwgZmxvYXQgZnJvbVNvdXJjZSwgZmxvYXQgdG9Tb3VyY2UsIGZsb2F0IGZyb21UYXJnZXQsIGZsb2F0IHRvVGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAtIGZyb21Tb3VyY2UpIC8gKHRvU291cmNlIC0gZnJvbVNvdXJjZSkgKiAodG9UYXJnZXQgLSBmcm9tVGFyZ2V0KSArIGZyb21UYXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBMaW1pdChyZWYgVmVjdG9yMiBWZWN0b3IsIGZsb2F0IExpbWl0U3F1YXJlZCwgZmxvYXQgTGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLkxlbmd0aFNxdWFyZWQoKSA+IExpbWl0U3F1YXJlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yID0gVmVjdG9yICogTGltaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBIZWFkaW5nKHRoaXMgVmVjdG9yMiBWZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguQXRhbjIoVmVjdG9yLlksIFZlY3Rvci5YKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyIEdldFNhZmVOb3JtYWwoVmVjdG9yMiBWZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihWZWN0b3IuTGVuZ3RoU3F1YXJlZCgpID4gMC4wMWYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWZWN0b3IyLk5vcm1hbGl6ZShWZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBQaWNrPFQ+KExpc3Q8VD4gT3B0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcHRpb25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wdGlvbnNbUmFuZG9taXplci5OZXh0KE9wdGlvbnMuQ291bnQpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBXcmFwVmVjdG9yKHJlZiBWZWN0b3IyIFZlY3RvciwgVmVjdG9yMiBCb3VuZHMsIGZsb2F0IEVycm9yVG9sZXJhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgUmlnaHQgPSBCb3VuZHMuWCArIEVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBmbG9hdCBMZWZ0ID0gLUVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLlggPiBSaWdodClcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5YID0gTGVmdDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoVmVjdG9yLlggPCBMZWZ0KVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlggPSBSaWdodDtcclxuICAgICAgICAgICAgZmxvYXQgVG9wID0gLUVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBmbG9hdCBCb3R0b20gPSBCb3VuZHMuWSArIEVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLlkgPiBCb3R0b20pXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWSA9IFRvcDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoVmVjdG9yLlkgPCBUb3ApXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWSA9IEJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgR2V0UmFuZG9tSW50ZWdlcihpbnQgTWF4VmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmFuZG9taXplci5OZXh0KE1heFZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBWZWN0b3IyIEdldFJhbmRvbVZlY3RvcjIoZmxvYXQgTWluWCwgZmxvYXQgTWF4WCwgZmxvYXQgTWluWSwgZmxvYXQgTWF4WSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihHZXRSYW5kb21GbG9hdChNaW5YLCBNYXhYKSwgR2V0UmFuZG9tRmxvYXQoTWluWSwgTWF4WSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTm9pc2VcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTm9pc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCA1MTI7IGkrKylcclxuICAgICAgICAgICAgICAgIHBlcm1baV0gPSBwW2kgJiAyNTVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaW1wbGV4IG5vaXNlIGluIDJELCAzRCBhbmQgNERcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXVtdIGdyYWQzID0gbmV3IGludFtdW10ge1xyXG4gICAgICAgIG5ldyBpbnRbXSB7MSwxLDB9LCBuZXcgaW50W10gey0xLDEsMH0sIG5ldyBpbnRbXSB7MSwtMSwwfSwgbmV3IGludFtdIHstMSwtMSwwfSxcclxuICAgICAgICBuZXcgaW50W10gezEsMCwxfSwgbmV3IGludFtdIHstMSwwLDF9LCBuZXcgaW50W10gezEsMCwtMX0sIG5ldyBpbnRbXSB7LTEsMCwtMX0sXHJcbiAgICAgICAgbmV3IGludFtdIHswLDEsMX0sIG5ldyBpbnRbXSB7MCwtMSwxfSwgbmV3IGludFtdIHswLDEsLTF9LCBuZXcgaW50W10gezAsLTEsLTF9XHJcbiAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXSBwID0gezE1MSwxNjAsMTM3LDkxLDkwLDE1LFxyXG4gICAgICAgIDEzMSwxMywyMDEsOTUsOTYsNTMsMTk0LDIzMyw3LDIyNSwxNDAsMzYsMTAzLDMwLDY5LDE0Miw4LDk5LDM3LDI0MCwyMSwxMCwyMyxcclxuICAgICAgICAxOTAsIDYsMTQ4LDI0NywxMjAsMjM0LDc1LDAsMjYsMTk3LDYyLDk0LDI1MiwyMTksMjAzLDExNywzNSwxMSwzMiw1NywxNzcsMzMsXHJcbiAgICAgICAgODgsMjM3LDE0OSw1Niw4NywxNzQsMjAsMTI1LDEzNiwxNzEsMTY4LCA2OCwxNzUsNzQsMTY1LDcxLDEzNCwxMzksNDgsMjcsMTY2LFxyXG4gICAgICAgIDc3LDE0NiwxNTgsMjMxLDgzLDExMSwyMjksMTIyLDYwLDIxMSwxMzMsMjMwLDIyMCwxMDUsOTIsNDEsNTUsNDYsMjQ1LDQwLDI0NCxcclxuICAgICAgICAxMDIsMTQzLDU0LCA2NSwyNSw2MywxNjEsIDEsMjE2LDgwLDczLDIwOSw3NiwxMzIsMTg3LDIwOCwgODksMTgsMTY5LDIwMCwxOTYsXHJcbiAgICAgICAgMTM1LDEzMCwxMTYsMTg4LDE1OSw4NiwxNjQsMTAwLDEwOSwxOTgsMTczLDE4NiwgMyw2NCw1MiwyMTcsMjI2LDI1MCwxMjQsMTIzLFxyXG4gICAgICAgIDUsMjAyLDM4LDE0NywxMTgsMTI2LDI1NSw4Miw4NSwyMTIsMjA3LDIwNiw1OSwyMjcsNDcsMTYsNTgsMTcsMTgyLDE4OSwyOCw0MixcclxuICAgICAgICAyMjMsMTgzLDE3MCwyMTMsMTE5LDI0OCwxNTIsIDIsNDQsMTU0LDE2MywgNzAsMjIxLDE1MywxMDEsMTU1LDE2NywgNDMsMTcyLDksXHJcbiAgICAgICAgMTI5LDIyLDM5LDI1MywgMTksOTgsMTA4LDExMCw3OSwxMTMsMjI0LDIzMiwxNzgsMTg1LCAxMTIsMTA0LDIxOCwyNDYsOTcsMjI4LFxyXG4gICAgICAgIDI1MSwzNCwyNDIsMTkzLDIzOCwyMTAsMTQ0LDEyLDE5MSwxNzksMTYyLDI0MSwgODEsNTEsMTQ1LDIzNSwyNDksMTQsMjM5LDEwNyxcclxuICAgICAgICA0OSwxOTIsMjE0LCAzMSwxODEsMTk5LDEwNiwxNTcsMTg0LCA4NCwyMDQsMTc2LDExNSwxMjEsNTAsNDUsMTI3LCA0LDE1MCwyNTQsXHJcbiAgICAgICAgMTM4LDIzNiwyMDUsOTMsMjIyLDExNCw2NywyOSwyNCw3MiwyNDMsMTQxLDEyOCwxOTUsNzgsNjYsMjE1LDYxLDE1NiwxODB9O1xyXG4gICAgICAgIC8vIFRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgaW5kZXggd3JhcHBpbmcsIGRvdWJsZSB0aGUgcGVybXV0YXRpb24gdGFibGUgbGVuZ3RoXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W10gcGVybSA9IG5ldyBpbnRbNTEyXTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgYSAqbG90KiBmYXN0ZXIgdGhhbiB1c2luZyAoaW50KU1hdGguZmxvb3IoeClcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgZmFzdGZsb29yKGRvdWJsZSB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPiAwID8gKGludCl4IDogKGludCl4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSBkb3QoaW50W10gZywgZG91YmxlIHgsIGRvdWJsZSB5LCBkb3VibGUgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnWzBdICogeCArIGdbMV0gKiB5ICsgZ1syXSAqIHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IEdldE5vaXNlKGRvdWJsZSBwWCwgZG91YmxlIHBZLCBkb3VibGUgcFopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkb3VibGUgbjAsIG4xLCBuMiwgbjM7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgZm91ciBjb3JuZXJzXHJcbiAgICAgICAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cclxuICAgICAgICAgICAgZG91YmxlIEYzID0gMS4wIC8gMy4wO1xyXG4gICAgICAgICAgICBkb3VibGUgcyA9IChwWCArIHBZICsgcFopICogRjM7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHNrZXcgZmFjdG9yIGZvciAzRFxyXG4gICAgICAgICAgICBpbnQgaSA9IGZhc3RmbG9vcihwWCArIHMpO1xyXG4gICAgICAgICAgICBpbnQgaiA9IGZhc3RmbG9vcihwWSArIHMpO1xyXG4gICAgICAgICAgICBpbnQgayA9IGZhc3RmbG9vcihwWiArIHMpO1xyXG4gICAgICAgICAgICBkb3VibGUgRzMgPSAxLjAgLyA2LjA7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHVuc2tldyBmYWN0b3IsIHRvb1xyXG4gICAgICAgICAgICBkb3VibGUgdCA9IChpICsgaiArIGspICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6KSBzcGFjZVxyXG4gICAgICAgICAgICBkb3VibGUgWTAgPSBqIC0gdDtcclxuICAgICAgICAgICAgZG91YmxlIFowID0gayAtIHQ7XHJcbiAgICAgICAgICAgIGRvdWJsZSB4MCA9IHBYIC0gWDA7IC8vIFRoZSB4LHkseiBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cclxuICAgICAgICAgICAgZG91YmxlIHkwID0gcFkgLSBZMDtcclxuICAgICAgICAgICAgZG91YmxlIHowID0gcFogLSBaMDtcclxuICAgICAgICAgICAgLy8gRm9yIHRoZSAzRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhIHNsaWdodGx5IGlycmVndWxhciB0ZXRyYWhlZHJvbi5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxyXG4gICAgICAgICAgICBpbnQgaTEsIGoxLCBrMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXHJcbiAgICAgICAgICAgIGludCBpMiwgajIsIGsyOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgICAgICBpZiAoeDAgPj0geTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh5MCA+PSB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMDtcclxuICAgICAgICAgICAgICAgIH0gLy8gWCBZIFogb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHgwID49IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBYIFogWSBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBaIFggWSBvcmRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgeyAvLyB4MDx5MFxyXG4gICAgICAgICAgICAgICAgaWYgKHkwIDwgejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFogWSBYIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4MCA8IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBZIFogWCBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBZIFggWiBvcmRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEEgc3RlcCBvZiAoMSwwLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMsLWMpIGluICh4LHkseiksXHJcbiAgICAgICAgICAgIC8vIGEgc3RlcCBvZiAoMCwxLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMsLWMpIGluICh4LHkseiksIGFuZFxyXG4gICAgICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMCwxKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsLWMsMS1jKSBpbiAoeCx5LHopLCB3aGVyZVxyXG4gICAgICAgICAgICAvLyBjID0gMS82LlxyXG5cclxuICAgICAgICAgICAgZG91YmxlIHgxID0geDAgLSBpMSArIEczOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MSA9IHkwIC0gajEgKyBHMztcclxuICAgICAgICAgICAgZG91YmxlIHoxID0gejAgLSBrMSArIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgeDIgPSB4MCAtIGkyICsgMi4wICogRzM7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xyXG4gICAgICAgICAgICBkb3VibGUgeTIgPSB5MCAtIGoyICsgMi4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MiA9IHowIC0gazIgKyAyLjAgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIHgzID0geDAgLSAxLjAgKyAzLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcclxuICAgICAgICAgICAgZG91YmxlIHkzID0geTAgLSAxLjAgKyAzLjAgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIHozID0gejAgLSAxLjAgKyAzLjAgKiBHMztcclxuICAgICAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmb3VyIHNpbXBsZXggY29ybmVyc1xyXG4gICAgICAgICAgICBpbnQgaWkgPSBpICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQgamogPSBqICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQga2sgPSBrICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQgZ2kwID0gcGVybVtpaSArIHBlcm1bamogKyBwZXJtW2trXV1dICUgMTI7XHJcbiAgICAgICAgICAgIGludCBnaTEgPSBwZXJtW2lpICsgaTEgKyBwZXJtW2pqICsgajEgKyBwZXJtW2trICsgazFdXV0gJSAxMjtcclxuICAgICAgICAgICAgaW50IGdpMiA9IHBlcm1baWkgKyBpMiArIHBlcm1bamogKyBqMiArIHBlcm1ba2sgKyBrMl1dXSAlIDEyO1xyXG4gICAgICAgICAgICBpbnQgZ2kzID0gcGVybVtpaSArIDEgKyBwZXJtW2pqICsgMSArIHBlcm1ba2sgKyAxXV1dICUgMTI7XHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIGZvdXIgY29ybmVyc1xyXG4gICAgICAgICAgICBkb3VibGUgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejA7XHJcbiAgICAgICAgICAgIGlmICh0MCA8IDApXHJcbiAgICAgICAgICAgICAgICBuMCA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MCAqPSB0MDtcclxuICAgICAgICAgICAgICAgIG4wID0gdDAgKiB0MCAqIGRvdChncmFkM1tnaTBdLCB4MCwgeTAsIHowKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejE7XHJcbiAgICAgICAgICAgIGlmICh0MSA8IDApXHJcbiAgICAgICAgICAgICAgICBuMSA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MSAqPSB0MTtcclxuICAgICAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIGRvdChncmFkM1tnaTFdLCB4MSwgeTEsIHoxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejI7XHJcbiAgICAgICAgICAgIGlmICh0MiA8IDApXHJcbiAgICAgICAgICAgICAgICBuMiA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MiAqPSB0MjtcclxuICAgICAgICAgICAgICAgIG4yID0gdDIgKiB0MiAqIGRvdChncmFkM1tnaTJdLCB4MiwgeTIsIHoyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejM7XHJcbiAgICAgICAgICAgIGlmICh0MyA8IDApXHJcbiAgICAgICAgICAgICAgICBuMyA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MyAqPSB0MztcclxuICAgICAgICAgICAgICAgIG4zID0gdDMgKiB0MyAqIGRvdChncmFkM1tnaTNdLCB4MywgeTMsIHozKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXHJcbiAgICAgICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLCAxXSAtIG5vdyBbMCwgMV1cclxuICAgICAgICAgICAgcmV0dXJuICgzMi4wZiAqIChmbG9hdCkobjAgKyBuMSArIG4yICsgbjMpICsgMSkgKiAwLjVmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57ICAgIFxyXG4gICAgcHVibGljIGNsYXNzIEFnZW50IDogR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBpbnQgQ3VycmVudEFnZW50SWQgPSAwO1xyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgVGV4dHVyZTJEIFRleHR1cmU7XHJcbiAgICAgICAgcHVibGljIGludCBBZ2VudElkID0gMDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1JvZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgVmVsb2NpdHkgPSBWZWN0b3IyLk9uZTtcclxuICAgICAgICBwcm90ZWN0ZWQgVmVjdG9yMiBBY2NlbGVyYXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE9yaWVudGF0aW9uID0gMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4Rm9yY2UgPSA1ZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4Rm9yY2VTcWFyZWQgPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhTcGVlZCA9IDEwMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4U3BlZWRTcXVhcmVkID0gMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4VHVyblJhdGUgPSAwLjYyODMxODU0OEY7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWdlbnRJZCA9IEN1cnJlbnRBZ2VudElkKys7XHJcbiAgICAgICAgICAgIE1heEZvcmNlU3FhcmVkID0gTWF4Rm9yY2UgKiBNYXhGb3JjZTtcclxuICAgICAgICAgICAgTWF4U3BlZWRTcXVhcmVkID0gTWF4U3BlZWQgKiBNYXhTcGVlZDtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMihGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KFNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuWCksIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5ZKSk7XHJcbiAgICAgICAgICAgIGZsb2F0IFF1YXJ0ZXJTcGVlZCA9IE1heFNwZWVkICogMC4yNWY7XHJcbiAgICAgICAgICAgIFZlbG9jaXR5ID0gRmxvY2tUb29scy5HZXRSYW5kb21WZWN0b3IyKC1RdWFydGVyU3BlZWQsIFF1YXJ0ZXJTcGVlZCwgLVF1YXJ0ZXJTcGVlZCwgUXVhcnRlclNwZWVkKTtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSBWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllciwgTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5MaW1pdChyZWYgQWNjZWxlcmF0aW9uLCBNYXhGb3JjZVNxYXJlZCwgTWF4Rm9yY2UpO1xyXG4gICAgICAgICAgICBWZWxvY2l0eSArPSBBY2NlbGVyYXRpb247XHJcbiAgICAgICAgICAgIEZsb2NrVG9vbHMuTGltaXQocmVmIFZlbG9jaXR5LCBNYXhTcGVlZFNxdWFyZWQsIE1heFNwZWVkKTtcclxuICAgICAgICAgICAgaWYoVmVsb2NpdHkuTGVuZ3RoU3F1YXJlZCgpID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZW50YXRpb24gPSBWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUG9zaXRpb24gKz0gVmVsb2NpdHkgKiBEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIEZsb2NrVG9vbHMuV3JhcFZlY3RvcihyZWYgUG9zaXRpb24sIFNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuVG9WZWN0b3IyKCksIDEwMCk7XHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiAqPSAwLjlmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpIHsgfVxyXG4gICAgICAgIHByb3RlY3RlZCBWZWN0b3IyIFNlZWsoVmVjdG9yMiBUYXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIGRlc2lyZWRWZWxvY2l0eSA9IFZlY3RvcjIuU3VidHJhY3QoVGFyZ2V0LCBQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGRlc2lyZWRWZWxvY2l0eS5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgZmxvYXQgZGVzaXJlZEhlYWRpbmcgPSBkZXNpcmVkVmVsb2NpdHkuSGVhZGluZygpO1xyXG4gICAgICAgICAgICBmbG9hdCBoZWFkaW5nRGlmZiA9IGRlc2lyZWRIZWFkaW5nIC0gT3JpZW50YXRpb247XHJcbiAgICAgICAgICAgIGlmKGhlYWRpbmdEaWZmID4gTWF0aC5QSSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZ0RpZmYgPSAtKE1hdGhIZWxwZXIuVHdvUGkgLSBoZWFkaW5nRGlmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaGVhZGluZ0RpZmYgPCAtTWF0aC5QSSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZ0RpZmYgPSBNYXRoSGVscGVyLlR3b1BpIC0gKGZsb2F0KU1hdGguQWJzKGhlYWRpbmdEaWZmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbG9hdCB0dXJuRGVsdGEgPSBNYXRoSGVscGVyLkNsYW1wKGhlYWRpbmdEaWZmLCAtTWF4VHVyblJhdGUsIE1heFR1cm5SYXRlKTtcclxuICAgICAgICAgICAgZmxvYXQgZGVzaXJlID0gT3JpZW50YXRpb24gKyB0dXJuRGVsdGE7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMigoZmxvYXQpTWF0aC5Db3MoZGVzaXJlKSAqIE1heFNwZWVkLCAoZmxvYXQpTWF0aC5TaW4oZGVzaXJlKSAqIE1heFNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgRmxvY2tBZ2VudCA6IEFnZW50XHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBpbnQgTnVtTmVpZ2hib3JzID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0Rpc3RhbmNlID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0Rpc3RhbmNlU3FhcmVkID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0FuZ2xlID0gMDtcclxuICAgICAgICBmbG9hdCBDb2hlc2lvbldlaWdodCA9IDA7XHJcbiAgICAgICAgZmxvYXQgU2VwYXJhdGlvbldlaWdodCA9IDA7XHJcbiAgICAgICAgZmxvYXQgQWxpZ25tZW50V2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBQZXJsaW5CZWF0ID0gMDtcclxuICAgICAgICBmbG9hdCBQUmFkaXVzID0gNTA7XHJcbiAgICAgICAgZmxvYXQgUFRoZXRhID0gMDtcclxuICAgICAgICBmbG9hdCBQT3JpZW50YXRpb24gPSAwO1xyXG4gICAgICAgIGZsb2F0IENvbG9yRmFsbG9mZiA9IDA7XHJcbiAgICAgICAgQ29sb3IgUGV0YWxDb2xvciA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgIFZlY3RvcjIgRHJhd1Bvc2l0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIHB1YmxpYyBGbG9ja0FnZW50KFRleHR1cmUyRCBBZ2VudFRleHR1cmUpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0dXJlID0gQWdlbnRUZXh0dXJlO1xyXG4gICAgICAgICAgICBNYXhGb3JjZSA9IDEwO1xyXG4gICAgICAgICAgICBNYXhGb3JjZVNxYXJlZCA9IE1heEZvcmNlICogTWF4Rm9yY2U7XHJcbiAgICAgICAgICAgIEZsb2NrRGlzdGFuY2UgPSA4MCArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMzAuMGYpO1xyXG4gICAgICAgICAgICBGbG9ja0Rpc3RhbmNlU3FhcmVkID0gRmxvY2tEaXN0YW5jZSAqIEZsb2NrRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIEZsb2NrQW5nbGUgPSAoZmxvYXQpTWF0aC5QSSAtIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoKGZsb2F0KU1hdGguUEkgKiAwLjVmKTtcclxuICAgICAgICAgICAgQ29oZXNpb25XZWlnaHQgPSAwLjNmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjNmKSAtIDAuMWY7XHJcbiAgICAgICAgICAgIFNlcGFyYXRpb25XZWlnaHQgPSAwLjJmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjI1ZikgLSAwLjFmO1xyXG4gICAgICAgICAgICBBbGlnbm1lbnRXZWlnaHQgPSAwLjNmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjI1ZikgLSAwLjA1ZjtcclxuICAgICAgICAgICAgUFRoZXRhID0gRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdChNYXRoSGVscGVyLlR3b1BpKTtcclxuICAgICAgICAgICAgUGVybGluQmVhdCA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTAuMDFmLCAwLjAxZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIsIExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IG1vZF9EVCA9IERlbHRhVGltZSAqIFRpbWVNb2RpZmllcjtcclxuICAgICAgICAgICAgVXBkYXRlQ29sb3IobW9kX0RUKTtcclxuICAgICAgICAgICAgTGlzdDxBZ2VudD4gbmVpZ2hib3JzID0gRmluZE5laWdoYm9ycyhBZ2VudHMpO1xyXG4gICAgICAgICAgICBGbGl0KEN1cnJlbnRUaW1lLCBtb2RfRFQpO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZsb2NraW5nRm9yY2UgPSBGbG9jayhuZWlnaGJvcnMpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IGZsb2NraW5nRm9yY2U7ICAgICAgICAgICBcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoQ3VycmVudFRpbWUsIG1vZF9EVCwgVGltZU1vZGlmaWVyLCBBZ2VudHMpO1xyXG4gICAgICAgICAgICBmbG9hdCBjb3NUaGV0YSA9IChmbG9hdClNYXRoLkNvcyhQVGhldGEpICogUFJhZGl1cztcclxuICAgICAgICAgICAgZmxvYXQgc2luVGhldGEgPSAoZmxvYXQpTWF0aC5TaW4oUFRoZXRhKSAqIFBSYWRpdXM7XHJcbiAgICAgICAgICAgIERyYXdQb3NpdGlvbiA9IFBvc2l0aW9uICsgbmV3IFZlY3RvcjIoY29zVGhldGEgLSBzaW5UaGV0YSwgY29zVGhldGEgKyBzaW5UaGV0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZvaWQgVXBkYXRlQ29sb3IoZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgQWRkaXRpdmVDaGFuZ2UgPSAoTnVtTmVpZ2hib3JzIC0gMSkgKiAyMCAqIERlbHRhVGltZTtcclxuICAgICAgICAgICAgQ29sb3JGYWxsb2ZmID0gTWF0aEhlbHBlci5DbGFtcChDb2xvckZhbGxvZmYgKyBBZGRpdGl2ZUNoYW5nZSwgMCwgMjAwKTtcclxuICAgICAgICAgICAgaW50IFJHQlZhbHVlID0gKGludClDb2xvckZhbGxvZmYgKyA1NTtcclxuICAgICAgICAgICAgUGV0YWxDb2xvciA9IG5ldyBDb2xvcihSR0JWYWx1ZSwgUkdCVmFsdWUsIFJHQlZhbHVlLCAyNTUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIExpc3Q8QWdlbnQ+IEZpbmROZWlnaGJvcnMoTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxBZ2VudD4gbmVhcmJ5ID0gbmV3IExpc3Q8QWdlbnQ+KCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGExID0gLUZsb2NrQW5nbGU7XHJcbiAgICAgICAgICAgIGZsb2F0IGEyID0gRmxvY2tBbmdsZTtcclxuICAgICAgICAgICAgVmVjdG9yMiBkaXIgPSBGbG9ja1Rvb2xzLkdldFNhZmVOb3JtYWwoVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihBZ2VudElkICE9IGEuQWdlbnRJZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyIHRvTmVpZ2hib3IgPSBWZWN0b3IyLlN1YnRyYWN0KGEuUG9zaXRpb24sIFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBkc3EgPSB0b05laWdoYm9yLkxlbmd0aFNxdWFyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkc3EgPCBGbG9ja0Rpc3RhbmNlU3FhcmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9OZWlnaGJvci5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9IFZlY3RvcjIuRG90KGRpciwgdG9OZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHRoZXRhID0gKGZsb2F0KU1hdGguQWNvcyhkb3RQcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhldGEgPCBGbG9ja0FuZ2xlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnkuQWRkKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE51bU5laWdoYm9ycyA9IG5lYXJieS5Db3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIG5lYXJieTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgRmxpdChmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9QT3JpZW50YXRpb24gPSBNYXRoSGVscGVyLldyYXBBbmdsZShQT3JpZW50YXRpb24pO1xyXG4gICAgICAgICAgICBQZXJsaW5CZWF0ID0gTWF0aEhlbHBlci5DbGFtcChQZXJsaW5CZWF0ICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgtMC4wNWYsIDAuMDVmKSwgLTFmLCAxZik7XHJcbiAgICAgICAgICAgIGZsb2F0IHBlcmxpblIgPSAoTm9pc2UuR2V0Tm9pc2UoQ3VycmVudFRpbWUgKiAxMDAsIDAsIDApKSAqIERlbHRhVGltZSAqIFBlcmxpbkJlYXQ7XHJcbiAgICAgICAgICAgIFBUaGV0YSA9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKFBUaGV0YSArIHBlcmxpblIpO1xyXG4gICAgICAgICAgICBQT3JpZW50YXRpb24gKz0gcGVybGluUjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVmVjdG9yMiBGbG9jayhMaXN0PEFnZW50PiBOZWlnaGJvcnMpXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoTmVpZ2hib3JzLkNvdW50ID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIHN0ZWVyID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGFsaWdubWVudCA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBzZXBhcmF0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGNvaGVzaW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGN2ID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBmb3JlYWNoKEFnZW50IGEgaW4gTmVpZ2hib3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBkaXN0U3EgPSBWZWN0b3IyLkRpc3RhbmNlU3F1YXJlZChQb3NpdGlvbiwgYS5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0ID0gRmxvY2tUb29scy5NYXAoZGlzdFNxLCAwLCBGbG9ja0Rpc3RhbmNlU3FhcmVkLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgZGlyID0gVmVjdG9yMi5NdWx0aXBseShhLlZlbG9jaXR5LCB0KTtcclxuICAgICAgICAgICAgICAgIGlmKGEuSXNSb2d1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVlciArPSBTZWVrKGEuUG9zaXRpb24gKyBhLlZlbG9jaXR5ICogMTApICogQ29oZXNpb25XZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50ICs9IGRpcjtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc2VwID0gVmVjdG9yMi5TdWJ0cmFjdChQb3NpdGlvbiwgYS5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCByID0gc2VwLkxlbmd0aFNxdWFyZWQoKTtcclxuICAgICAgICAgICAgICAgIHNlcC5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIHNlcCAqPSAxLjBmIC8gcjtcclxuICAgICAgICAgICAgICAgIHNlcGFyYXRpb24gKz0gc2VwO1xyXG4gICAgICAgICAgICAgICAgY3YgKz0gYS5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbGlnbm1lbnQgLz0gTmVpZ2hib3JzLkNvdW50O1xyXG4gICAgICAgICAgICBhbGlnbm1lbnQuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN0ZWVyICs9IGFsaWdubWVudCAqIEFsaWdubWVudFdlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGN2IC89IE5laWdoYm9ycy5Db3VudDtcclxuICAgICAgICAgICAgY29oZXNpb24gPSBTZWVrKGN2KTtcclxuICAgICAgICAgICAgY29oZXNpb24uTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN0ZWVyICs9IGNvaGVzaW9uICogQ29oZXNpb25XZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzZXBhcmF0aW9uLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBzZXBhcmF0aW9uICogU2VwYXJhdGlvbldlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ZWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU0IuRHJhdyhUZXh0dXJlLCBEcmF3UG9zaXRpb24sIFRleHR1cmUuQm91bmRzLCBQZXRhbENvbG9yLCBQT3JpZW50YXRpb24gKiBNYXRoSGVscGVyLlR3b1BpLCBuZXcgVmVjdG9yMigwLjVmLCAwLjVmKSwgMTYuMGYsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFJvZ3VlQWdlbnQgOiBBZ2VudFxyXG4gICAge1xyXG4gICAgICAgIGNsYXNzIFBhc3RQb3NpdGlvblxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcHVibGljIENvbG9yIENvbG9yID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgICAgIHB1YmxpYyBWZWN0b3IyIFBvc2l0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmbG9hdCBXYW5kZXJTdHJlbmd0aCA9IDEwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlckFtcCA9IDE1MDAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlckRpc3RhbmNlID0gMTAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlclJhZGl1cyA9IDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyUmF0ZSA9IDAuMDFmO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlclRoZXRhID0gMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJEZWx0YSA9IDA7XHJcbiAgICAgICAgZmxvYXQgU2Vla1N0cmVuZ3RoID0gMjtcclxuICAgICAgICBmbG9hdCBEaWxhdGlvbkRpc3RhbmNlID0gMTUwO1xyXG4gICAgICAgIGZsb2F0IERpbGF0aW9uRGlzdGFuY2VTcXVhcmVkID0gMDtcclxuICAgICAgICBMaXN0PFBhc3RQb3NpdGlvbj4gUGFzdCA9IG5ldyBMaXN0PFBhc3RQb3NpdGlvbj4oKTtcclxuICAgICAgICBWZWN0b3IyIFRhcmdldCA9IG5ldyBWZWN0b3IyKDIwMCwgMjAwKTtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBGbG93Rm9yY2UgPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgR2FtZU9iamVjdCBUYXJnZXRPYmplY3QgPSBudWxsO1xyXG4gICAgICAgIHB1YmxpYyBib29sIElzU2Vla2luZyA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBSb2d1ZUFnZW50KFRleHR1cmUyRCBpblRleHR1cmUpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJc1JvZ3VlID0gdHJ1ZTtcclxuICAgICAgICAgICAgTWF4Rm9yY2UgPSAxNWY7XHJcbiAgICAgICAgICAgIE1heFNwZWVkID0gMjUwLjBmO1xyXG4gICAgICAgICAgICBNYXhGb3JjZVNxYXJlZCA9IE1heEZvcmNlICogTWF4Rm9yY2U7XHJcbiAgICAgICAgICAgIE1heFNwZWVkU3F1YXJlZCA9IE1heFNwZWVkICogTWF4U3BlZWQ7XHJcbiAgICAgICAgICAgIERpbGF0aW9uRGlzdGFuY2VTcXVhcmVkID0gRGlsYXRpb25EaXN0YW5jZSAqIERpbGF0aW9uRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIFdhbmRlclJhZGl1cyA9IFdhbmRlckRpc3RhbmNlICogMS4yNWY7XHJcbiAgICAgICAgICAgIFRleHR1cmUgPSBpblRleHR1cmU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIsIExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSBGbG93Rm9yY2U7XHJcbiAgICAgICAgICAgIFJvZ3VlU2VlaygpO1xyXG4gICAgICAgICAgICBXYW5kZXIoQ3VycmVudFRpbWUsIERlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIENyZWF0ZUhpc3RvcnkoKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoQ3VycmVudFRpbWUsIERlbHRhVGltZSwgVGltZU1vZGlmaWVyLCBBZ2VudHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIFJvZ3VlU2VlaygpXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihJc1NlZWtpbmcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFRhcmdldCA9IFRhcmdldE9iamVjdCAhPSBudWxsID8gVGFyZ2V0T2JqZWN0LlBvc2l0aW9uIDogVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBzZWVrVmVjdG9yID0gU2VlayhUYXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgc2Vla1ZlY3Rvci5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIHNlZWtWZWN0b3IgKj0gU2Vla1N0cmVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IHNlZWtWZWN0b3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBDcmVhdGVIaXN0b3J5KClcclxuICAgICAgICB7ICAgIFxyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gUGFzdC5Db3VudCAtIDE7IGkgPj0gMDsgaS0tKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBQYXN0W2ldLkNvbG9yLkEgLT0gNTtcclxuICAgICAgICAgICAgICAgIGlmIChQYXN0W2ldLkNvbG9yLkEgPCA1KVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBhc3QuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFBhc3QuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaW5kZXggPSBGbG9ja1Rvb2xzLkdldFJhbmRvbUludGVnZXIoUGFzdC5Db3VudCk7XHJcbiAgICAgICAgICAgICAgICBDb2xvciBQaWNrZWRDb2xvciA9IEZsb2NrVG9vbHMuUGljazxDb2xvcj4oZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8Q29sb3I+KCksKF9vMSk9PntfbzEuQWRkKENvbG9yLkRhcmtTZWFHcmVlbik7X28xLkFkZChDb2xvci5EYXJrVHVycXVvaXNlKTtfbzEuQWRkKENvbG9yLkRhcmtSZWQpO19vMS5BZGQoQ29sb3IuTGlnaHRZZWxsb3cpO19vMS5BZGQoQ29sb3IuV2hpdGUpO19vMS5BZGQoQ29sb3IuRmxvcmFsV2hpdGUpO3JldHVybiBfbzE7fSkpICogMC41ZjtcclxuICAgICAgICAgICAgICAgIFBpY2tlZENvbG9yLkEgPSBQYXN0W2luZGV4XS5Db2xvci5BO1xyXG4gICAgICAgICAgICAgICAgUGFzdFtpbmRleF0uQ29sb3IgPSBQaWNrZWRDb2xvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQYXN0LkFkZChuZXcgUGFzdFBvc2l0aW9uKCkgeyBQb3NpdGlvbiA9IFBvc2l0aW9uICsgRmxvY2tUb29scy5HZXRSYW5kb21WZWN0b3IyKC0yLCAyLCAtMiwgMiksIENvbG9yID0gQ29sb3IuV2hpdGUgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIFdhbmRlcihmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVmVjdG9yMiBmb3J3YXJkX3RhcmdldCA9IG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbiksIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpO1xyXG4gICAgICAgICAgICBmb3J3YXJkX3RhcmdldCAqPSBXYW5kZXJEaXN0YW5jZTtcclxuXHJcbiAgICAgICAgICAgIFdhbmRlckRlbHRhID0gTWF0aEhlbHBlci5DbGFtcChXYW5kZXJEZWx0YSArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTEsIDEpLCAtMTAsIDEwKTtcclxuICAgICAgICAgICAgZmxvYXQgdmFsdWUgPSBOb2lzZS5HZXROb2lzZShDdXJyZW50VGltZSAqIFdhbmRlckRlbHRhICogV2FuZGVyUmF0ZSwgMCwgMCkgKiBXYW5kZXJBbXA7XHJcbiAgICAgICAgICAgIFdhbmRlclRoZXRhICs9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKFdhbmRlclRoZXRhICsgdmFsdWUgKiBEZWx0YVRpbWUpO1xyXG5cclxuICAgICAgICAgICAgZmxvYXQgeCA9IFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLkNvcyhXYW5kZXJUaGV0YSkgLSBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5TaW4oV2FuZGVyVGhldGEpO1xyXG4gICAgICAgICAgICBmbG9hdCB5ID0gV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguQ29zKFdhbmRlclRoZXRhKSArIFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLlNpbihXYW5kZXJUaGV0YSk7XHJcblxyXG4gICAgICAgICAgICBWZWN0b3IyIHdhbmRlcl90YXJnZXQgPSBuZXcgVmVjdG9yMihmb3J3YXJkX3RhcmdldC5YICsgeCwgZm9yd2FyZF90YXJnZXQuWSArIHkpO1xyXG4gICAgICAgICAgICB3YW5kZXJfdGFyZ2V0Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gd2FuZGVyX3RhcmdldCAqIFdhbmRlclN0cmVuZ3RoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaChQYXN0UG9zaXRpb24gcCBpbiBQYXN0KVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBTQi5EcmF3KFRleHR1cmUsIHAuUG9zaXRpb24sIFRleHR1cmUuQm91bmRzLCBwLkNvbG9yLCAwLCBuZXcgVmVjdG9yMigwLjVmLCAwLjVmKSwgMy4wZiwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb29uIDogR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHJlYWRvbmx5IGZsb2F0IFNwZWVkID0gMC4wMDAwNWY7XHJcbiAgICAgICAgcmVhZG9ubHkgVmVjdG9yMiBBbmNob3JQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKDEyMDAsIDUyMDApO1xyXG4gICAgICAgIGZsb2F0IE9yaWVudGF0aW9uID0gMC4wZjsgICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgVGV4dHVyZTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSAoZmxvYXQpTWF0aC5QSSAqIDEuOTNmO1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEFuY2hvclBvc2l0aW9uLlggKyAoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIDUxMDAqKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSksIEFuY2hvclBvc2l0aW9uLlkgKyAoLTUxMDAqKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uID0gbmV3IFZlY3RvcjIoQW5jaG9yUG9zaXRpb24uWCArICgoZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pICsgNTEwMCAqIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpLCBBbmNob3JQb3NpdGlvbi5ZICsgKC01MTAwICogKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpKTtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSBNYXRoSGVscGVyLldyYXBBbmdsZShPcmllbnRhdGlvbiArIERlbHRhVGltZSAqIFNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgUG9zaXRpb24sIFRleHR1cmUuQm91bmRzLCBDb2xvci5XaGl0ZSwgMCwgbmV3IFZlY3RvcjIoMC41ZiwgMC41ZiksIDEsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
