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
            canvas.width = 800;
            canvas.height = 480;
            canvas.id = "monogamecanvas";
            document.body.appendChild(canvas);

            document.body.appendChild(document.createElement("br"));

            var can = document.createElement("canvas");
            can.width = 800;
            can.height = 1024;
            document.body.appendChild(can);

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
                    this.NumFlock = 57;
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
                this.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal"));
                this.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal-blue"));
                this.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal-yellow"));
                this.RogueTexture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "rogue");

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
                SB.Draw$3(this.Texture, this.Position.$clone(), Microsoft.Xna.Framework.Color.White.$clone());
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VkU2lyRmxvY2tzYWxvdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiR2FtZS9TaXJGbG9ja3NhbG90R2FtZS5jcyIsIkdhbWUvRmxvY2suY3MiLCJHYW1lL0Zsb2NrVG9vbHMuY3MiLCJHYW1lL0Zsb2NrQWdlbnQuY3MiLCJHYW1lL01vb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFVWUEsYUFBYUE7WUFDYkE7WUFDQUE7WUFDQUE7WUFDQUEsMEJBQXFFQTs7WUFFckVBLDBCQUFpRUE7O1lBRWpFQSxVQUFVQTtZQUNWQTtZQUNBQTtZQUNBQSwwQkFBcUVBOztZQUVyRUEsZ0NBQU9BLElBQUlBO1lBQ1hBOzs7Ozs7Ozs7Ozs7Ozs7O2dDQ2ZzQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQ0FMQSxLQUFJQTs7Ozs7OzttQ0FFREEsZUFBK0JBO2dCQUVuREEsS0FBS0EsV0FBV0EsSUFBSUEsOEJBQVVBO29CQUUxQkEsZ0JBQVdBLElBQUlBLHlCQUFXQSwwRUFBMkJBOztnQkFFekRBLEtBQUtBLFlBQVdBLEtBQUlBLDhCQUFVQTtvQkFFMUJBLGdCQUFXQSxJQUFJQSx5QkFBV0E7Ozs4QkFJZkEsYUFBbUJBLFdBQWlCQTs7Z0JBRW5EQSwwQkFBb0JBOzs7O3dCQUVoQkEsU0FBU0EsYUFBYUEsV0FBV0EsY0FBY0E7Ozs7Ozs7OzRCQUd0Q0E7O2dCQUViQSwwQkFBb0JBOzs7O3dCQUVoQkEsT0FBT0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQ0MxQllBLElBQUlBOzs7OzBDQUNJQTtvQkFFL0JBLE9BQU9BLEFBQU9BLG1EQUEwQkE7OzRDQUVUQSxLQUFXQTtvQkFFMUNBLGVBQWlCQSxBQUFPQSxTQUFTQSxPQUFPQSxBQUFPQSxTQUFTQTtvQkFDeERBLE9BQU9BLEFBQU9BLG1EQUEwQkEsV0FBV0E7OytCQUUvQkEsT0FBYUEsWUFBa0JBLFVBQWdCQSxZQUFr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b0JBQWVBLEFBQU9BLFNBQVNBLG9CQUFlQSxvQkFBZUEsQUFBT0EsU0FBU0E7O2dCQUV2RkEsb0JBQXdCQSxJQUFJQSx1Q0FBUUEsbUJBQW1CQSxHQUFHQSxtQkFBbUJBO2dCQUM3RUE7Z0JBQ0FBLDRGQUFnQkEsc0VBQWdCQTs7NEJBRVZBOztnQkFFdEJBLDBCQUEwQkE7Ozs7d0JBRXRCQSxVQUFRQSxjQUFTQSxxQkFBWUEiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFNpckZsb2Nrc2Fsb3Q7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlZFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEdhbWUgZ2FtZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gbmV3IFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9IDgwMDtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IDQ4MDtcclxuICAgICAgICAgICAgY2FudmFzLmlkID0gXCJtb25vZ2FtZWNhbnZhc1wiO1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50PihjYW52YXMpO1xyXG5cclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxSZXR5cGVkLmRvbS5IVE1MQlJFbGVtZW50PihuZXcgUmV0eXBlZC5kb20uSFRNTEJSRWxlbWVudCgpKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBjYW4gPSBuZXcgUmV0eXBlZC5kb20uSFRNTENhbnZhc0VsZW1lbnQoKTtcclxuICAgICAgICAgICAgY2FuLndpZHRoID0gODAwO1xyXG4gICAgICAgICAgICBjYW4uaGVpZ2h0ID0gMTAyNDtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudD4oY2FuKTtcclxuXHJcbiAgICAgICAgICAgIGdhbWUgPSBuZXcgU2lyRmxvY2tzYWxvdEdhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgUG9zaXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgcHVibGljIEdhbWVPYmplY3QoKSB7IH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBTaXJGbG9ja3NhbG90R2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50IFNjcmVlblNpemUgPSBuZXcgUG9pbnQoMTI4MCwgNzIwKTtcclxuICAgICAgICBHcmFwaGljc0RldmljZU1hbmFnZXIgZ3JhcGhpY3M7XHJcbiAgICAgICAgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2g7XHJcbiAgICAgICAgU3ByaXRlRm9udCBEZWJ1Z0ZvbnQ7XHJcbiAgICAgICAgVGV4dHVyZTJEIEJhY2tncm91bmRUZXh0dXJlO1xyXG4gICAgICAgIFRleHR1cmUyRCBSb2d1ZVRleHR1cmU7XHJcbiAgICAgICAgTGlzdDxUZXh0dXJlMkQ+IFBldGFsVGV4dHVyZXM7XHJcbiAgICAgICAgTW9vbiBNb29uO1xyXG4gICAgICAgIEZsb2NrIEZsb2NrO1xyXG4gICAgICAgIGZsb2F0IFRpbWVNb2RpZmllciA9IDEuMGY7XHJcbiAgICAgICAgcHVibGljIFNpckZsb2Nrc2Fsb3RHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzTW91c2VWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSBTY3JlZW5TaXplLlg7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSBTY3JlZW5TaXplLlk7XHJcbiAgICAgICAgICAgIC8vSXNGaXhlZFRpbWVTdGVwID0gZ3JhcGhpY3MuU3luY2hyb25pemVXaXRoVmVydGljYWxSZXRyYWNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBQZXRhbFRleHR1cmVzID0gbmV3IExpc3Q8VGV4dHVyZTJEPigpO1xyXG4gICAgICAgICAgICBNb29uID0gbmV3IE1vb24oKTtcclxuICAgICAgICAgICAgRmxvY2sgPSBuZXcgRmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2ggPSBuZXcgU3ByaXRlQmF0Y2goR3JhcGhpY3NEZXZpY2UpO1xyXG4gICAgICAgICAgICAvL0RlYnVnRm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkZvbnRzL0RlYnVnXCIpO1xyXG4gICAgICAgICAgICBNb29uLlRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm1vb25cIik7XHJcbiAgICAgICAgICAgIEJhY2tncm91bmRUZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJzdGFyc1wiKTtcclxuICAgICAgICAgICAgUGV0YWxUZXh0dXJlcy5BZGQoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJwZXRhbFwiKSk7XHJcbiAgICAgICAgICAgIFBldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicGV0YWwtYmx1ZVwiKSk7XHJcbiAgICAgICAgICAgIFBldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicGV0YWwteWVsbG93XCIpKTtcclxuICAgICAgICAgICAgUm9ndWVUZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJyb2d1ZVwiKTtcclxuICAgICAgICAgICAgLy8gUG9zdCBDb250ZW50IExvYWRpbmdcclxuXHJcbiAgICAgICAgICAgIEZsb2NrLkNyZWF0ZUZsb2NrKFBldGFsVGV4dHVyZXMsIFJvZ3VlVGV4dHVyZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKEdhbWVQYWQuR2V0U3RhdGUoUGxheWVySW5kZXguT25lKS5CdXR0b25zLkJhY2sgPT0gQnV0dG9uU3RhdGUuUHJlc3NlZCB8fCBLZXlib2FyZC5HZXRTdGF0ZSgpLklzS2V5RG93bihLZXlzLkVzY2FwZSkpXHJcbiAgICAgICAgICAgICAgICBFeGl0KCk7XHJcbiAgICAgICAgICAgIGZsb2F0IERlbHRhVGltZSA9IChmbG9hdClnYW1lVGltZS5FbGFwc2VkR2FtZVRpbWUuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICBmbG9hdCBDdXJyZW50VGltZSA9IChmbG9hdClnYW1lVGltZS5Ub3RhbEdhbWVUaW1lLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgTW9vbi5VcGRhdGUoRGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgRmxvY2suVXBkYXRlKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUsIFRpbWVNb2RpZmllcik7XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBEcmF3KEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgZnJhbWVSYXRlID0gMSAvIChmbG9hdClnYW1lVGltZS5FbGFwc2VkR2FtZVRpbWUuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICBHcmFwaGljc0RldmljZS5DbGVhcihuZXcgQ29sb3IoMCkpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5CZWdpbihTcHJpdGVTb3J0TW9kZS5EZWZlcnJlZCwgQmxlbmRTdGF0ZS5Ob25QcmVtdWx0aXBsaWVkKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRHJhdyhCYWNrZ3JvdW5kVGV4dHVyZSwgbmV3IFJlY3RhbmdsZSgwLCAwLCBTY3JlZW5TaXplLlgsIFNjcmVlblNpemUuWSksIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgTW9vbi5EcmF3KHNwcml0ZUJhdGNoKTtcclxuICAgICAgICAgICAgRmxvY2suRHJhdyhzcHJpdGVCYXRjaCk7XHJcbiAgICAgICAgICAgIC8vc3ByaXRlQmF0Y2guRHJhd1N0cmluZyhEZWJ1Z0ZvbnQsIHN0cmluZy5Gb3JtYXQoXCJ7MH0gKEZQUylcIiwgZnJhbWVSYXRlKSwgbmV3IFZlY3RvcjIoMTAsIDEwKSwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5FbmQoKTtcclxuXHJcbiAgICAgICAgICAgIGJhc2UuRHJhdyhnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBGbG9ja1xyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgaW50IE51bUZsb2NrID0gNTc7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBpbnQgTnVtUm9ndWUgPSAzO1xyXG4gICAgICAgIExpc3Q8QWdlbnQ+IEFnZW50cyA9IG5ldyBMaXN0PEFnZW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBGbG9jaygpIHsgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENyZWF0ZUZsb2NrKExpc3Q8VGV4dHVyZTJEPiBQZXRhbFRleHR1cmVzLCBUZXh0dXJlMkQgUm9ndWVUZXh0dXJlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1GbG9jazsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZ2VudHMuQWRkKG5ldyBGbG9ja0FnZW50KEZsb2NrVG9vbHMuUGljazxUZXh0dXJlMkQ+KFBldGFsVGV4dHVyZXMpKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1Sb2d1ZTsgaSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBBZ2VudHMuQWRkKG5ldyBSb2d1ZUFnZW50KFJvZ3VlVGV4dHVyZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoQWdlbnQgYSBpbiBBZ2VudHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGEuVXBkYXRlKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUsIFRpbWVNb2RpZmllciwgQWdlbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoQWdlbnQgYSBpbiBBZ2VudHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGEuRHJhdyhTQik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBzdGF0aWMgY2xhc3MgRmxvY2tUb29sc1xyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBSYW5kb20gUmFuZG9taXplciA9IG5ldyBSYW5kb20oKTtcclxuICAgICAgICBzdGF0aWMgcHVibGljIGZsb2F0IEdldFJhbmRvbUZsb2F0KGZsb2F0IFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClSYW5kb21pemVyLk5leHREb3VibGUoKSAqIFZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdGF0aWMgcHVibGljIGZsb2F0IEdldFJhbmRvbUZsb2F0KGZsb2F0IE1pbiwgZmxvYXQgTWF4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgQWJzVG90YWwgPSAoZmxvYXQpTWF0aC5BYnMoTWluKSArIChmbG9hdClNYXRoLkFicyhNYXgpO1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KVJhbmRvbWl6ZXIuTmV4dERvdWJsZSgpICogQWJzVG90YWwgKyBNaW47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgTWFwKGZsb2F0IHZhbHVlLCBmbG9hdCBmcm9tU291cmNlLCBmbG9hdCB0b1NvdXJjZSwgZmxvYXQgZnJvbVRhcmdldCwgZmxvYXQgdG9UYXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlIC0gZnJvbVNvdXJjZSkgLyAodG9Tb3VyY2UgLSBmcm9tU291cmNlKSAqICh0b1RhcmdldCAtIGZyb21UYXJnZXQpICsgZnJvbVRhcmdldDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIExpbWl0KHJlZiBWZWN0b3IyIFZlY3RvciwgZmxvYXQgTGltaXRTcXVhcmVkLCBmbG9hdCBMaW1pdClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChWZWN0b3IuTGVuZ3RoU3F1YXJlZCgpID4gTGltaXRTcXVhcmVkKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IgPSBWZWN0b3IgKiBMaW1pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IEhlYWRpbmcodGhpcyBWZWN0b3IyIFZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpTWF0aC5BdGFuMihWZWN0b3IuWSwgVmVjdG9yLlgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIFZlY3RvcjIgR2V0U2FmZU5vcm1hbChWZWN0b3IyIFZlY3RvcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFZlY3Rvci5MZW5ndGhTcXVhcmVkKCkgPiAwLjAxZilcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjIuTm9ybWFsaXplKFZlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjIuWmVybztcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBUIFBpY2s8VD4oTGlzdDxUPiBPcHRpb25zKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKE9wdGlvbnMuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT3B0aW9uc1tSYW5kb21pemVyLk5leHQoT3B0aW9ucy5Db3VudCldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIFdyYXBWZWN0b3IocmVmIFZlY3RvcjIgVmVjdG9yLCBWZWN0b3IyIEJvdW5kcywgZmxvYXQgRXJyb3JUb2xlcmFuY2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBSaWdodCA9IEJvdW5kcy5YICsgRXJyb3JUb2xlcmFuY2U7XHJcbiAgICAgICAgICAgIGZsb2F0IExlZnQgPSAtRXJyb3JUb2xlcmFuY2U7XHJcbiAgICAgICAgICAgIGlmIChWZWN0b3IuWCA+IFJpZ2h0KVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlggPSBMZWZ0O1xyXG4gICAgICAgICAgICBlbHNlIGlmIChWZWN0b3IuWCA8IExlZnQpXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWCA9IFJpZ2h0O1xyXG4gICAgICAgICAgICBmbG9hdCBUb3AgPSAtRXJyb3JUb2xlcmFuY2U7XHJcbiAgICAgICAgICAgIGZsb2F0IEJvdHRvbSA9IEJvdW5kcy5ZICsgRXJyb3JUb2xlcmFuY2U7XHJcbiAgICAgICAgICAgIGlmIChWZWN0b3IuWSA+IEJvdHRvbSlcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5ZID0gVG9wO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChWZWN0b3IuWSA8IFRvcClcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5ZID0gQm90dG9tO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIGludCBHZXRSYW5kb21JbnRlZ2VyKGludCBNYXhWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBSYW5kb21pemVyLk5leHQoTWF4VmFsdWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW50ZXJuYWwgc3RhdGljIFZlY3RvcjIgR2V0UmFuZG9tVmVjdG9yMihmbG9hdCBNaW5YLCBmbG9hdCBNYXhYLCBmbG9hdCBNaW5ZLCBmbG9hdCBNYXhZKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKEdldFJhbmRvbUZsb2F0KE1pblgsIE1heFgpLCBHZXRSYW5kb21GbG9hdChNaW5ZLCBNYXhZKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHN0YXRpYyBjbGFzcyBOb2lzZVxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBOb2lzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IDUxMjsgaSsrKVxyXG4gICAgICAgICAgICAgICAgcGVybVtpXSA9IHBbaSAmIDI1NV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIHNpbXBsZXggbm9pc2UgaW4gMkQsIDNEIGFuZCA0RFxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludFtdW10gZ3JhZDMgPSBuZXcgaW50W11bXSB7XHJcbiAgICAgICAgbmV3IGludFtdIHsxLDEsMH0sIG5ldyBpbnRbXSB7LTEsMSwwfSwgbmV3IGludFtdIHsxLC0xLDB9LCBuZXcgaW50W10gey0xLC0xLDB9LFxyXG4gICAgICAgIG5ldyBpbnRbXSB7MSwwLDF9LCBuZXcgaW50W10gey0xLDAsMX0sIG5ldyBpbnRbXSB7MSwwLC0xfSwgbmV3IGludFtdIHstMSwwLC0xfSxcclxuICAgICAgICBuZXcgaW50W10gezAsMSwxfSwgbmV3IGludFtdIHswLC0xLDF9LCBuZXcgaW50W10gezAsMSwtMX0sIG5ldyBpbnRbXSB7MCwtMSwtMX1cclxuICAgIH07XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludFtdIHAgPSB7MTUxLDE2MCwxMzcsOTEsOTAsMTUsXHJcbiAgICAgICAgMTMxLDEzLDIwMSw5NSw5Niw1MywxOTQsMjMzLDcsMjI1LDE0MCwzNiwxMDMsMzAsNjksMTQyLDgsOTksMzcsMjQwLDIxLDEwLDIzLFxyXG4gICAgICAgIDE5MCwgNiwxNDgsMjQ3LDEyMCwyMzQsNzUsMCwyNiwxOTcsNjIsOTQsMjUyLDIxOSwyMDMsMTE3LDM1LDExLDMyLDU3LDE3NywzMyxcclxuICAgICAgICA4OCwyMzcsMTQ5LDU2LDg3LDE3NCwyMCwxMjUsMTM2LDE3MSwxNjgsIDY4LDE3NSw3NCwxNjUsNzEsMTM0LDEzOSw0OCwyNywxNjYsXHJcbiAgICAgICAgNzcsMTQ2LDE1OCwyMzEsODMsMTExLDIyOSwxMjIsNjAsMjExLDEzMywyMzAsMjIwLDEwNSw5Miw0MSw1NSw0NiwyNDUsNDAsMjQ0LFxyXG4gICAgICAgIDEwMiwxNDMsNTQsIDY1LDI1LDYzLDE2MSwgMSwyMTYsODAsNzMsMjA5LDc2LDEzMiwxODcsMjA4LCA4OSwxOCwxNjksMjAwLDE5NixcclxuICAgICAgICAxMzUsMTMwLDExNiwxODgsMTU5LDg2LDE2NCwxMDAsMTA5LDE5OCwxNzMsMTg2LCAzLDY0LDUyLDIxNywyMjYsMjUwLDEyNCwxMjMsXHJcbiAgICAgICAgNSwyMDIsMzgsMTQ3LDExOCwxMjYsMjU1LDgyLDg1LDIxMiwyMDcsMjA2LDU5LDIyNyw0NywxNiw1OCwxNywxODIsMTg5LDI4LDQyLFxyXG4gICAgICAgIDIyMywxODMsMTcwLDIxMywxMTksMjQ4LDE1MiwgMiw0NCwxNTQsMTYzLCA3MCwyMjEsMTUzLDEwMSwxNTUsMTY3LCA0MywxNzIsOSxcclxuICAgICAgICAxMjksMjIsMzksMjUzLCAxOSw5OCwxMDgsMTEwLDc5LDExMywyMjQsMjMyLDE3OCwxODUsIDExMiwxMDQsMjE4LDI0Niw5NywyMjgsXHJcbiAgICAgICAgMjUxLDM0LDI0MiwxOTMsMjM4LDIxMCwxNDQsMTIsMTkxLDE3OSwxNjIsMjQxLCA4MSw1MSwxNDUsMjM1LDI0OSwxNCwyMzksMTA3LFxyXG4gICAgICAgIDQ5LDE5MiwyMTQsIDMxLDE4MSwxOTksMTA2LDE1NywxODQsIDg0LDIwNCwxNzYsMTE1LDEyMSw1MCw0NSwxMjcsIDQsMTUwLDI1NCxcclxuICAgICAgICAxMzgsMjM2LDIwNSw5MywyMjIsMTE0LDY3LDI5LDI0LDcyLDI0MywxNDEsMTI4LDE5NSw3OCw2NiwyMTUsNjEsMTU2LDE4MH07XHJcbiAgICAgICAgLy8gVG8gcmVtb3ZlIHRoZSBuZWVkIGZvciBpbmRleCB3cmFwcGluZywgZG91YmxlIHRoZSBwZXJtdXRhdGlvbiB0YWJsZSBsZW5ndGhcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXSBwZXJtID0gbmV3IGludFs1MTJdO1xyXG5cclxuICAgICAgICAvLyBUaGlzIG1ldGhvZCBpcyBhICpsb3QqIGZhc3RlciB0aGFuIHVzaW5nIChpbnQpTWF0aC5mbG9vcih4KVxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludCBmYXN0Zmxvb3IoZG91YmxlIHgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4geCA+IDAgPyAoaW50KXggOiAoaW50KXggLSAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgZG91YmxlIGRvdChpbnRbXSBnLCBkb3VibGUgeCwgZG91YmxlIHksIGRvdWJsZSB6KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGdbMF0gKiB4ICsgZ1sxXSAqIHkgKyBnWzJdICogejtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgR2V0Tm9pc2UoZG91YmxlIHBYLCBkb3VibGUgcFksIGRvdWJsZSBwWilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGRvdWJsZSBuMCwgbjEsIG4yLCBuMzsgLy8gTm9pc2UgY29udHJpYnV0aW9ucyBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcclxuICAgICAgICAgICAgLy8gU2tldyB0aGUgaW5wdXQgc3BhY2UgdG8gZGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggY2VsbCB3ZSdyZSBpblxyXG4gICAgICAgICAgICBkb3VibGUgRjMgPSAxLjAgLyAzLjA7XHJcbiAgICAgICAgICAgIGRvdWJsZSBzID0gKHBYICsgcFkgKyBwWikgKiBGMzsgLy8gVmVyeSBuaWNlIGFuZCBzaW1wbGUgc2tldyBmYWN0b3IgZm9yIDNEXHJcbiAgICAgICAgICAgIGludCBpID0gZmFzdGZsb29yKHBYICsgcyk7XHJcbiAgICAgICAgICAgIGludCBqID0gZmFzdGZsb29yKHBZICsgcyk7XHJcbiAgICAgICAgICAgIGludCBrID0gZmFzdGZsb29yKHBaICsgcyk7XHJcbiAgICAgICAgICAgIGRvdWJsZSBHMyA9IDEuMCAvIDYuMDsgLy8gVmVyeSBuaWNlIGFuZCBzaW1wbGUgdW5za2V3IGZhY3RvciwgdG9vXHJcbiAgICAgICAgICAgIGRvdWJsZSB0ID0gKGkgKyBqICsgaykgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIFgwID0gaSAtIHQ7IC8vIFVuc2tldyB0aGUgY2VsbCBvcmlnaW4gYmFjayB0byAoeCx5LHopIHNwYWNlXHJcbiAgICAgICAgICAgIGRvdWJsZSBZMCA9IGogLSB0O1xyXG4gICAgICAgICAgICBkb3VibGUgWjAgPSBrIC0gdDtcclxuICAgICAgICAgICAgZG91YmxlIHgwID0gcFggLSBYMDsgLy8gVGhlIHgseSx6IGRpc3RhbmNlcyBmcm9tIHRoZSBjZWxsIG9yaWdpblxyXG4gICAgICAgICAgICBkb3VibGUgeTAgPSBwWSAtIFkwO1xyXG4gICAgICAgICAgICBkb3VibGUgejAgPSBwWiAtIFowO1xyXG4gICAgICAgICAgICAvLyBGb3IgdGhlIDNEIGNhc2UsIHRoZSBzaW1wbGV4IHNoYXBlIGlzIGEgc2xpZ2h0bHkgaXJyZWd1bGFyIHRldHJhaGVkcm9uLlxyXG4gICAgICAgICAgICAvLyBEZXRlcm1pbmUgd2hpY2ggc2ltcGxleCB3ZSBhcmUgaW4uXHJcbiAgICAgICAgICAgIGludCBpMSwgajEsIGsxOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcclxuICAgICAgICAgICAgaW50IGkyLCBqMiwgazI7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXHJcbiAgICAgICAgICAgIGlmICh4MCA+PSB5MClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKHkwID49IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBYIFkgWiBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeDAgPj0gejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFggWiBZIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFogWCBZIG9yZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7IC8vIHgwPHkwXHJcbiAgICAgICAgICAgICAgICBpZiAoeTAgPCB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWiBZIFggb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHgwIDwgejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFkgWiBYIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFkgWCBaIG9yZGVyXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQSBzdGVwIG9mICgxLDAsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKDEtYywtYywtYykgaW4gKHgseSx6KSxcclxuICAgICAgICAgICAgLy8gYSBzdGVwIG9mICgwLDEsMCkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLDEtYywtYykgaW4gKHgseSx6KSwgYW5kXHJcbiAgICAgICAgICAgIC8vIGEgc3RlcCBvZiAoMCwwLDEpIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywtYywxLWMpIGluICh4LHkseiksIHdoZXJlXHJcbiAgICAgICAgICAgIC8vIGMgPSAxLzYuXHJcblxyXG4gICAgICAgICAgICBkb3VibGUgeDEgPSB4MCAtIGkxICsgRzM7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcclxuICAgICAgICAgICAgZG91YmxlIHkxID0geTAgLSBqMSArIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgejEgPSB6MCAtIGsxICsgRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB4MiA9IHgwIC0gaTIgKyAyLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MiA9IHkwIC0gajIgKyAyLjAgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIHoyID0gejAgLSBrMiArIDIuMCAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgeDMgPSB4MCAtIDEuMCArIDMuMCAqIEczOyAvLyBPZmZzZXRzIGZvciBsYXN0IGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xyXG4gICAgICAgICAgICBkb3VibGUgeTMgPSB5MCAtIDEuMCArIDMuMCAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgejMgPSB6MCAtIDEuMCArIDMuMCAqIEczO1xyXG4gICAgICAgICAgICAvLyBXb3JrIG91dCB0aGUgaGFzaGVkIGdyYWRpZW50IGluZGljZXMgb2YgdGhlIGZvdXIgc2ltcGxleCBjb3JuZXJzXHJcbiAgICAgICAgICAgIGludCBpaSA9IGkgJiAyNTU7XHJcbiAgICAgICAgICAgIGludCBqaiA9IGogJiAyNTU7XHJcbiAgICAgICAgICAgIGludCBrayA9IGsgJiAyNTU7XHJcbiAgICAgICAgICAgIGludCBnaTAgPSBwZXJtW2lpICsgcGVybVtqaiArIHBlcm1ba2tdXV0gJSAxMjtcclxuICAgICAgICAgICAgaW50IGdpMSA9IHBlcm1baWkgKyBpMSArIHBlcm1bamogKyBqMSArIHBlcm1ba2sgKyBrMV1dXSAlIDEyO1xyXG4gICAgICAgICAgICBpbnQgZ2kyID0gcGVybVtpaSArIGkyICsgcGVybVtqaiArIGoyICsgcGVybVtrayArIGsyXV1dICUgMTI7XHJcbiAgICAgICAgICAgIGludCBnaTMgPSBwZXJtW2lpICsgMSArIHBlcm1bamogKyAxICsgcGVybVtrayArIDFdXV0gJSAxMjtcclxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRoZSBjb250cmlidXRpb24gZnJvbSB0aGUgZm91ciBjb3JuZXJzXHJcbiAgICAgICAgICAgIGRvdWJsZSB0MCA9IDAuNiAtIHgwICogeDAgLSB5MCAqIHkwIC0gejAgKiB6MDtcclxuICAgICAgICAgICAgaWYgKHQwIDwgMClcclxuICAgICAgICAgICAgICAgIG4wID0gMC4wO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQwICo9IHQwO1xyXG4gICAgICAgICAgICAgICAgbjAgPSB0MCAqIHQwICogZG90KGdyYWQzW2dpMF0sIHgwLCB5MCwgejApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvdWJsZSB0MSA9IDAuNiAtIHgxICogeDEgLSB5MSAqIHkxIC0gejEgKiB6MTtcclxuICAgICAgICAgICAgaWYgKHQxIDwgMClcclxuICAgICAgICAgICAgICAgIG4xID0gMC4wO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQxICo9IHQxO1xyXG4gICAgICAgICAgICAgICAgbjEgPSB0MSAqIHQxICogZG90KGdyYWQzW2dpMV0sIHgxLCB5MSwgejEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvdWJsZSB0MiA9IDAuNiAtIHgyICogeDIgLSB5MiAqIHkyIC0gejIgKiB6MjtcclxuICAgICAgICAgICAgaWYgKHQyIDwgMClcclxuICAgICAgICAgICAgICAgIG4yID0gMC4wO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQyICo9IHQyO1xyXG4gICAgICAgICAgICAgICAgbjIgPSB0MiAqIHQyICogZG90KGdyYWQzW2dpMl0sIHgyLCB5MiwgejIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRvdWJsZSB0MyA9IDAuNiAtIHgzICogeDMgLSB5MyAqIHkzIC0gejMgKiB6MztcclxuICAgICAgICAgICAgaWYgKHQzIDwgMClcclxuICAgICAgICAgICAgICAgIG4zID0gMC4wO1xyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHQzICo9IHQzO1xyXG4gICAgICAgICAgICAgICAgbjMgPSB0MyAqIHQzICogZG90KGdyYWQzW2dpM10sIHgzLCB5MywgejMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEFkZCBjb250cmlidXRpb25zIGZyb20gZWFjaCBjb3JuZXIgdG8gZ2V0IHRoZSBmaW5hbCBub2lzZSB2YWx1ZS5cclxuICAgICAgICAgICAgLy8gVGhlIHJlc3VsdCBpcyBzY2FsZWQgdG8gc3RheSBqdXN0IGluc2lkZSBbLTEsIDFdIC0gbm93IFswLCAxXVxyXG4gICAgICAgICAgICByZXR1cm4gKDMyLjBmICogKGZsb2F0KShuMCArIG4xICsgbjIgKyBuMykgKyAxKSAqIDAuNWY7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbnsgICAgXHJcbiAgICBwdWJsaWMgY2xhc3MgQWdlbnQgOiBHYW1lT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIGludCBDdXJyZW50QWdlbnRJZCA9IDA7XHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBUZXh0dXJlMkQgVGV4dHVyZTtcclxuICAgICAgICBwdWJsaWMgaW50IEFnZW50SWQgPSAwO1xyXG4gICAgICAgIHB1YmxpYyBib29sIElzUm9ndWUgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBWZWxvY2l0eSA9IFZlY3RvcjIuT25lO1xyXG4gICAgICAgIHByb3RlY3RlZCBWZWN0b3IyIEFjY2VsZXJhdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgT3JpZW50YXRpb24gPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhGb3JjZSA9IDVmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhGb3JjZVNxYXJlZCA9IDAuMGY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heFNwZWVkID0gMTAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhTcGVlZFNxdWFyZWQgPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhUdXJuUmF0ZSA9IDAuNjI4MzE4NTQ4RjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBBZ2VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZ2VudElkID0gQ3VycmVudEFnZW50SWQrKztcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBNYXhTcGVlZFNxdWFyZWQgPSBNYXhTcGVlZCAqIE1heFNwZWVkO1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5YKSwgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdChTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlkpKTtcclxuICAgICAgICAgICAgZmxvYXQgUXVhcnRlclNwZWVkID0gTWF4U3BlZWQgKiAwLjI1ZjtcclxuICAgICAgICAgICAgVmVsb2NpdHkgPSBGbG9ja1Rvb2xzLkdldFJhbmRvbVZlY3RvcjIoLVF1YXJ0ZXJTcGVlZCwgUXVhcnRlclNwZWVkLCAtUXVhcnRlclNwZWVkLCBRdWFydGVyU3BlZWQpO1xyXG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IFZlbG9jaXR5LkhlYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGbG9ja1Rvb2xzLkxpbWl0KHJlZiBBY2NlbGVyYXRpb24sIE1heEZvcmNlU3FhcmVkLCBNYXhGb3JjZSk7XHJcbiAgICAgICAgICAgIFZlbG9jaXR5ICs9IEFjY2VsZXJhdGlvbjtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5MaW1pdChyZWYgVmVsb2NpdHksIE1heFNwZWVkU3F1YXJlZCwgTWF4U3BlZWQpO1xyXG4gICAgICAgICAgICBpZihWZWxvY2l0eS5MZW5ndGhTcXVhcmVkKCkgPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmllbnRhdGlvbiA9IFZlbG9jaXR5LkhlYWRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQb3NpdGlvbiArPSBWZWxvY2l0eSAqIERlbHRhVGltZTtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5XcmFwVmVjdG9yKHJlZiBQb3NpdGlvbiwgU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5Ub1ZlY3RvcjIoKSwgMTAwKTtcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICo9IDAuOWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQikgeyB9XHJcbiAgICAgICAgcHJvdGVjdGVkIFZlY3RvcjIgU2VlayhWZWN0b3IyIFRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVzaXJlZFZlbG9jaXR5ID0gVmVjdG9yMi5TdWJ0cmFjdChUYXJnZXQsIFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZGVzaXJlZFZlbG9jaXR5Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCBkZXNpcmVkSGVhZGluZyA9IGRlc2lyZWRWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGhlYWRpbmdEaWZmID0gZGVzaXJlZEhlYWRpbmcgLSBPcmllbnRhdGlvbjtcclxuICAgICAgICAgICAgaWYoaGVhZGluZ0RpZmYgPiBNYXRoLlBJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGlmZiA9IC0oTWF0aEhlbHBlci5Ud29QaSAtIGhlYWRpbmdEaWZmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoZWFkaW5nRGlmZiA8IC1NYXRoLlBJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGlmZiA9IE1hdGhIZWxwZXIuVHdvUGkgLSAoZmxvYXQpTWF0aC5BYnMoaGVhZGluZ0RpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsb2F0IHR1cm5EZWx0YSA9IE1hdGhIZWxwZXIuQ2xhbXAoaGVhZGluZ0RpZmYsIC1NYXhUdXJuUmF0ZSwgTWF4VHVyblJhdGUpO1xyXG4gICAgICAgICAgICBmbG9hdCBkZXNpcmUgPSBPcmllbnRhdGlvbiArIHR1cm5EZWx0YTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkNvcyhkZXNpcmUpICogTWF4U3BlZWQsIChmbG9hdClNYXRoLlNpbihkZXNpcmUpICogTWF4U3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBGbG9ja0FnZW50IDogQWdlbnRcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGludCBOdW1OZWlnaGJvcnMgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrRGlzdGFuY2VTcWFyZWQgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrQW5nbGUgPSAwO1xyXG4gICAgICAgIGZsb2F0IENvaGVzaW9uV2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBTZXBhcmF0aW9uV2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBBbGlnbm1lbnRXZWlnaHQgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBlcmxpbkJlYXQgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBSYWRpdXMgPSA1MDtcclxuICAgICAgICBmbG9hdCBQVGhldGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBPcmllbnRhdGlvbiA9IDA7XHJcbiAgICAgICAgZmxvYXQgQ29sb3JGYWxsb2ZmID0gMDtcclxuICAgICAgICBDb2xvciBQZXRhbENvbG9yID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgVmVjdG9yMiBEcmF3UG9zaXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgcHVibGljIEZsb2NrQWdlbnQoVGV4dHVyZTJEIEFnZW50VGV4dHVyZSkgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFRleHR1cmUgPSBBZ2VudFRleHR1cmU7XHJcbiAgICAgICAgICAgIE1heEZvcmNlID0gMTA7XHJcbiAgICAgICAgICAgIE1heEZvcmNlU3FhcmVkID0gTWF4Rm9yY2UgKiBNYXhGb3JjZTtcclxuICAgICAgICAgICAgRmxvY2tEaXN0YW5jZSA9IDgwICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgzMC4wZik7XHJcbiAgICAgICAgICAgIEZsb2NrRGlzdGFuY2VTcWFyZWQgPSBGbG9ja0Rpc3RhbmNlICogRmxvY2tEaXN0YW5jZTtcclxuICAgICAgICAgICAgRmxvY2tBbmdsZSA9IChmbG9hdClNYXRoLlBJIC0gRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgoZmxvYXQpTWF0aC5QSSAqIDAuNWYpO1xyXG4gICAgICAgICAgICBDb2hlc2lvbldlaWdodCA9IDAuM2YgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KDAuM2YpIC0gMC4xZjtcclxuICAgICAgICAgICAgU2VwYXJhdGlvbldlaWdodCA9IDAuMmYgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KDAuMjVmKSAtIDAuMWY7XHJcbiAgICAgICAgICAgIEFsaWdubWVudFdlaWdodCA9IDAuM2YgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KDAuMjVmKSAtIDAuMDVmO1xyXG4gICAgICAgICAgICBQVGhldGEgPSBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KE1hdGhIZWxwZXIuVHdvUGkpO1xyXG4gICAgICAgICAgICBQZXJsaW5CZWF0ID0gRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgtMC4wMWYsIDAuMDFmKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllciwgTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgbW9kX0RUID0gRGVsdGFUaW1lICogVGltZU1vZGlmaWVyO1xyXG4gICAgICAgICAgICBVcGRhdGVDb2xvcihtb2RfRFQpO1xyXG4gICAgICAgICAgICBMaXN0PEFnZW50PiBuZWlnaGJvcnMgPSBGaW5kTmVpZ2hib3JzKEFnZW50cyk7XHJcbiAgICAgICAgICAgIEZsaXQoQ3VycmVudFRpbWUsIG1vZF9EVCk7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZmxvY2tpbmdGb3JjZSA9IEZsb2NrKG5laWdoYm9ycyk7ICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gZmxvY2tpbmdGb3JjZTsgICAgICAgICAgIFxyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShDdXJyZW50VGltZSwgbW9kX0RULCBUaW1lTW9kaWZpZXIsIEFnZW50cyk7XHJcbiAgICAgICAgICAgIGZsb2F0IGNvc1RoZXRhID0gKGZsb2F0KU1hdGguQ29zKFBUaGV0YSkgKiBQUmFkaXVzO1xyXG4gICAgICAgICAgICBmbG9hdCBzaW5UaGV0YSA9IChmbG9hdClNYXRoLlNpbihQVGhldGEpICogUFJhZGl1cztcclxuICAgICAgICAgICAgRHJhd1Bvc2l0aW9uID0gUG9zaXRpb24gKyBuZXcgVmVjdG9yMihjb3NUaGV0YSAtIHNpblRoZXRhLCBjb3NUaGV0YSArIHNpblRoZXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBVcGRhdGVDb2xvcihmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBBZGRpdGl2ZUNoYW5nZSA9IChOdW1OZWlnaGJvcnMgLSAxKSAqIDIwICogRGVsdGFUaW1lO1xyXG4gICAgICAgICAgICBDb2xvckZhbGxvZmYgPSBNYXRoSGVscGVyLkNsYW1wKENvbG9yRmFsbG9mZiArIEFkZGl0aXZlQ2hhbmdlLCAwLCAyMDApO1xyXG4gICAgICAgICAgICBpbnQgUkdCVmFsdWUgPSAoaW50KUNvbG9yRmFsbG9mZiArIDU1O1xyXG4gICAgICAgICAgICBQZXRhbENvbG9yID0gbmV3IENvbG9yKFJHQlZhbHVlLCBSR0JWYWx1ZSwgUkdCVmFsdWUsIDI1NSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByaXZhdGUgTGlzdDxBZ2VudD4gRmluZE5laWdoYm9ycyhMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBMaXN0PEFnZW50PiBuZWFyYnkgPSBuZXcgTGlzdDxBZ2VudD4oKTtcclxuICAgICAgICAgICAgZmxvYXQgYTEgPSAtRmxvY2tBbmdsZTtcclxuICAgICAgICAgICAgZmxvYXQgYTIgPSBGbG9ja0FuZ2xlO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGRpciA9IEZsb2NrVG9vbHMuR2V0U2FmZU5vcm1hbChWZWxvY2l0eSk7XHJcbiAgICAgICAgICAgIGZvcmVhY2goQWdlbnQgYSBpbiBBZ2VudHMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKEFnZW50SWQgIT0gYS5BZ2VudElkKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFZlY3RvcjIgdG9OZWlnaGJvciA9IFZlY3RvcjIuU3VidHJhY3QoYS5Qb3NpdGlvbiwgUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIGZsb2F0IGRzcSA9IHRvTmVpZ2hib3IuTGVuZ3RoU3F1YXJlZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGRzcSA8IEZsb2NrRGlzdGFuY2VTcWFyZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b05laWdoYm9yLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCBkb3RQcm9kdWN0ID0gVmVjdG9yMi5Eb3QoZGlyLCB0b05laWdoYm9yKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgdGhldGEgPSAoZmxvYXQpTWF0aC5BY29zKGRvdFByb2R1Y3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGV0YSA8IEZsb2NrQW5nbGUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5lYXJieS5BZGQoYSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTnVtTmVpZ2hib3JzID0gbmVhcmJ5LkNvdW50O1xyXG4gICAgICAgICAgICByZXR1cm4gbmVhcmJ5O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBGbGl0KGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICAvL1BPcmllbnRhdGlvbiA9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKFBPcmllbnRhdGlvbik7XHJcbiAgICAgICAgICAgIFBlcmxpbkJlYXQgPSBNYXRoSGVscGVyLkNsYW1wKFBlcmxpbkJlYXQgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KC0wLjA1ZiwgMC4wNWYpLCAtMWYsIDFmKTtcclxuICAgICAgICAgICAgZmxvYXQgcGVybGluUiA9IChOb2lzZS5HZXROb2lzZShDdXJyZW50VGltZSAqIDEwMCwgMCwgMCkpICogRGVsdGFUaW1lICogUGVybGluQmVhdDtcclxuICAgICAgICAgICAgUFRoZXRhID0gTWF0aEhlbHBlci5XcmFwQW5nbGUoUFRoZXRhICsgcGVybGluUik7XHJcbiAgICAgICAgICAgIFBPcmllbnRhdGlvbiArPSBwZXJsaW5SO1xyXG4gICAgICAgIH1cclxuICAgICAgICBWZWN0b3IyIEZsb2NrKExpc3Q8QWdlbnQ+IE5laWdoYm9ycylcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmIChOZWlnaGJvcnMuQ291bnQgPT0gMClcclxuICAgICAgICAgICAgICAgIHJldHVybiBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgc3RlZXIgPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgYWxpZ25tZW50ID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIHNlcGFyYXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgY29oZXNpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgY3YgPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIGZvcmVhY2goQWdlbnQgYSBpbiBOZWlnaGJvcnMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZsb2F0IGRpc3RTcSA9IFZlY3RvcjIuRGlzdGFuY2VTcXVhcmVkKFBvc2l0aW9uLCBhLlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHQgPSBGbG9ja1Rvb2xzLk1hcChkaXN0U3EsIDAsIEZsb2NrRGlzdGFuY2VTcWFyZWQsIDEsIDApO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBkaXIgPSBWZWN0b3IyLk11bHRpcGx5KGEuVmVsb2NpdHksIHQpO1xyXG4gICAgICAgICAgICAgICAgaWYoYS5Jc1JvZ3VlKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZWVyICs9IFNlZWsoYS5Qb3NpdGlvbiArIGEuVmVsb2NpdHkgKiAxMCkgKiBDb2hlc2lvbldlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RlZXI7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBhbGlnbm1lbnQgKz0gZGlyO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yMiBzZXAgPSBWZWN0b3IyLlN1YnRyYWN0KFBvc2l0aW9uLCBhLlBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgIGZsb2F0IHIgPSBzZXAuTGVuZ3RoU3F1YXJlZCgpO1xyXG4gICAgICAgICAgICAgICAgc2VwLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2VwICo9IDEuMGYgLyByO1xyXG4gICAgICAgICAgICAgICAgc2VwYXJhdGlvbiArPSBzZXA7XHJcbiAgICAgICAgICAgICAgICBjdiArPSBhLlBvc2l0aW9uO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFsaWdubWVudCAvPSBOZWlnaGJvcnMuQ291bnQ7XHJcbiAgICAgICAgICAgIGFsaWdubWVudC5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc3RlZXIgKz0gYWxpZ25tZW50ICogQWxpZ25tZW50V2VpZ2h0O1xyXG5cclxuICAgICAgICAgICAgY3YgLz0gTmVpZ2hib3JzLkNvdW50O1xyXG4gICAgICAgICAgICBjb2hlc2lvbiA9IFNlZWsoY3YpO1xyXG4gICAgICAgICAgICBjb2hlc2lvbi5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc3RlZXIgKz0gY29oZXNpb24gKiBDb2hlc2lvbldlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHNlcGFyYXRpb24uTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN0ZWVyICs9IHNlcGFyYXRpb24gKiBTZXBhcmF0aW9uV2VpZ2h0O1xyXG4gICAgICAgICAgICByZXR1cm4gc3RlZXI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTQi5EcmF3KFRleHR1cmUsIERyYXdQb3NpdGlvbiwgVGV4dHVyZS5Cb3VuZHMsIFBldGFsQ29sb3IsIFBPcmllbnRhdGlvbiAqIE1hdGhIZWxwZXIuVHdvUGksIFZlY3RvcjIuT25lLCBuZXcgVmVjdG9yMigwLjVmLCAwLjVmKSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgUm9ndWVBZ2VudCA6IEFnZW50XHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3MgUGFzdFBvc2l0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgQ29sb3IgQ29sb3IgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjIgUG9zaXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZsb2F0IFdhbmRlclN0cmVuZ3RoID0gMTA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyQW1wID0gMTUwMDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyRGlzdGFuY2UgPSAxMDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyUmFkaXVzID0gMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJSYXRlID0gMC4wMWY7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyVGhldGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlckRlbHRhID0gMDtcclxuICAgICAgICBmbG9hdCBTZWVrU3RyZW5ndGggPSAyO1xyXG4gICAgICAgIGZsb2F0IERpbGF0aW9uRGlzdGFuY2UgPSAxNTA7XHJcbiAgICAgICAgZmxvYXQgRGlsYXRpb25EaXN0YW5jZVNxdWFyZWQgPSAwO1xyXG4gICAgICAgIExpc3Q8UGFzdFBvc2l0aW9uPiBQYXN0ID0gbmV3IExpc3Q8UGFzdFBvc2l0aW9uPigpO1xyXG4gICAgICAgIFZlY3RvcjIgVGFyZ2V0ID0gbmV3IFZlY3RvcjIoMjAwLCAyMDApO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIEZsb3dGb3JjZSA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBHYW1lT2JqZWN0IFRhcmdldE9iamVjdCA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIFJvZ3VlQWdlbnQoVGV4dHVyZTJEIGluVGV4dHVyZSkgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzUm9ndWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBNYXhGb3JjZSA9IDE1ZjtcclxuICAgICAgICAgICAgTWF4U3BlZWQgPSAyNTAuMGY7XHJcbiAgICAgICAgICAgIE1heEZvcmNlU3FhcmVkID0gTWF4Rm9yY2UgKiBNYXhGb3JjZTtcclxuICAgICAgICAgICAgTWF4U3BlZWRTcXVhcmVkID0gTWF4U3BlZWQgKiBNYXhTcGVlZDtcclxuICAgICAgICAgICAgRGlsYXRpb25EaXN0YW5jZVNxdWFyZWQgPSBEaWxhdGlvbkRpc3RhbmNlICogRGlsYXRpb25EaXN0YW5jZTtcclxuICAgICAgICAgICAgV2FuZGVyUmFkaXVzID0gV2FuZGVyRGlzdGFuY2UgKiAxLjI1ZjtcclxuICAgICAgICAgICAgVGV4dHVyZSA9IGluVGV4dHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllciwgTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IEZsb3dGb3JjZTtcclxuICAgICAgICAgICAgUm9ndWVTZWVrKCk7XHJcbiAgICAgICAgICAgIFdhbmRlcihDdXJyZW50VGltZSwgRGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgQ3JlYXRlSGlzdG9yeSgpO1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIsIEFnZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUm9ndWVTZWVrKClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKElzU2Vla2luZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0ID0gVGFyZ2V0T2JqZWN0ICE9IG51bGwgPyBUYXJnZXRPYmplY3QuUG9zaXRpb24gOiBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHNlZWtWZWN0b3IgPSBTZWVrKFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZWVrVmVjdG9yLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2Vla1ZlY3RvciAqPSBTZWVrU3RyZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gc2Vla1ZlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhpc3RvcnkoKVxyXG4gICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBQYXN0LkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFBhc3RbaV0uQ29sb3IuQSAtPSA1O1xyXG4gICAgICAgICAgICAgICAgaWYgKFBhc3RbaV0uQ29sb3IuQSA8IDUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgUGFzdC5SZW1vdmVBdChpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUGFzdC5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGludCBpbmRleCA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tSW50ZWdlcihQYXN0LkNvdW50KTtcclxuICAgICAgICAgICAgICAgIENvbG9yIFBpY2tlZENvbG9yID0gRmxvY2tUb29scy5QaWNrPENvbG9yPihnbG9iYWw6OkJyaWRnZS5TY3JpcHQuQ2FsbEZvcihuZXcgTGlzdDxDb2xvcj4oKSwoX28xKT0+e19vMS5BZGQoQ29sb3IuRGFya1NlYUdyZWVuKTtfbzEuQWRkKENvbG9yLkRhcmtUdXJxdW9pc2UpO19vMS5BZGQoQ29sb3IuRGFya1JlZCk7X28xLkFkZChDb2xvci5MaWdodFllbGxvdyk7X28xLkFkZChDb2xvci5XaGl0ZSk7X28xLkFkZChDb2xvci5GbG9yYWxXaGl0ZSk7cmV0dXJuIF9vMTt9KSkgKiAwLjVmO1xyXG4gICAgICAgICAgICAgICAgUGlja2VkQ29sb3IuQSA9IFBhc3RbaW5kZXhdLkNvbG9yLkE7XHJcbiAgICAgICAgICAgICAgICBQYXN0W2luZGV4XS5Db2xvciA9IFBpY2tlZENvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFBhc3QuQWRkKG5ldyBQYXN0UG9zaXRpb24oKSB7IFBvc2l0aW9uID0gUG9zaXRpb24gKyBGbG9ja1Rvb2xzLkdldFJhbmRvbVZlY3RvcjIoLTIsIDIsIC0yLCAyKSwgQ29sb3IgPSBDb2xvci5XaGl0ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgV2FuZGVyKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZvcndhcmRfdGFyZ2V0ID0gbmV3IFZlY3RvcjIoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSwgKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIGZvcndhcmRfdGFyZ2V0ICo9IFdhbmRlckRpc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgV2FuZGVyRGVsdGEgPSBNYXRoSGVscGVyLkNsYW1wKFdhbmRlckRlbHRhICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgtMSwgMSksIC0xMCwgMTApO1xyXG4gICAgICAgICAgICBmbG9hdCB2YWx1ZSA9IE5vaXNlLkdldE5vaXNlKEN1cnJlbnRUaW1lICogV2FuZGVyRGVsdGEgKiBXYW5kZXJSYXRlLCAwLCAwKSAqIFdhbmRlckFtcDtcclxuICAgICAgICAgICAgV2FuZGVyVGhldGEgKz0gTWF0aEhlbHBlci5XcmFwQW5nbGUoV2FuZGVyVGhldGEgKyB2YWx1ZSAqIERlbHRhVGltZSk7XHJcblxyXG4gICAgICAgICAgICBmbG9hdCB4ID0gV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguQ29zKFdhbmRlclRoZXRhKSAtIFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLlNpbihXYW5kZXJUaGV0YSk7XHJcbiAgICAgICAgICAgIGZsb2F0IHkgPSBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5Db3MoV2FuZGVyVGhldGEpICsgV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguU2luKFdhbmRlclRoZXRhKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgd2FuZGVyX3RhcmdldCA9IG5ldyBWZWN0b3IyKGZvcndhcmRfdGFyZ2V0LlggKyB4LCBmb3J3YXJkX3RhcmdldC5ZICsgeSk7XHJcbiAgICAgICAgICAgIHdhbmRlcl90YXJnZXQuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSB3YW5kZXJfdGFyZ2V0ICogV2FuZGVyU3RyZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFBhc3RQb3NpdGlvbiBwIGluIFBhc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgcC5Qb3NpdGlvbiwgcC5Db2xvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9vbiA6IEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBmbG9hdCBTcGVlZCA9IDAuMDAwMDVmO1xyXG4gICAgICAgIHJlYWRvbmx5IFZlY3RvcjIgQW5jaG9yUG9zaXRpb24gPSBuZXcgVmVjdG9yMigxMjAwLCA1MjAwKTtcclxuICAgICAgICBmbG9hdCBPcmllbnRhdGlvbiA9IDAuMGY7ICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIFRleHR1cmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb29uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWVudGF0aW9uID0gKGZsb2F0KU1hdGguUEkgKiAxLjkzZjtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMihBbmNob3JQb3NpdGlvbi5YICsgKChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyA1MTAwKihmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpLCBBbmNob3JQb3NpdGlvbi5ZICsgKC01MTAwKihmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEFuY2hvclBvc2l0aW9uLlggKyAoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIDUxMDAgKiAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSwgQW5jaG9yUG9zaXRpb24uWSArICgtNTEwMCAqIChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSk7XHJcbiAgICAgICAgICAgIE9yaWVudGF0aW9uID0gTWF0aEhlbHBlci5XcmFwQW5nbGUoT3JpZW50YXRpb24gKyBEZWx0YVRpbWUgKiBTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTQi5EcmF3KFRleHR1cmUsIFBvc2l0aW9uLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
