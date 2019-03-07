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
            Agents: null,
            PetalTextures: null,
            RogueTexture: null,
            OnePixelTexture: null,
            IsDrawingForDebug: false
        },
        ctors: {
            init: function () {
                this.Agents = new (System.Collections.Generic.List$1(SirFlocksalot.Agent)).ctor();
                this.PetalTextures = new (System.Collections.Generic.List$1(Microsoft.Xna.Framework.Graphics.Texture2D)).ctor();
                this.IsDrawingForDebug = false;
            },
            ctor: function () {
                this.$initialize();
            }
        },
        methods: {
            ChangeTextures: function () {
                this.IsDrawingForDebug = !this.IsDrawingForDebug;
                if (this.IsDrawingForDebug) {
                    if (this.OnePixelTexture != null) {
                        for (var i = 0; i < SirFlocksalot.Flock.NumFlock; i = (i + 1) | 0) {
                            this.Agents.getItem(i).AgentColor = new Microsoft.Xna.Framework.Color.$ctor7(255, 255, 255, 50);
                            this.Agents.getItem(i).DrawScale = 16.0;
                            this.Agents.getItem(i).Texture = this.OnePixelTexture;
                        }
                        for (var i1 = SirFlocksalot.Flock.NumFlock; i1 < ((SirFlocksalot.Flock.NumFlock + SirFlocksalot.Flock.NumRogue) | 0); i1 = (i1 + 1) | 0) {
                            this.Agents.getItem(i1).DrawScale = 3.0;
                            this.Agents.getItem(i1).Texture = this.OnePixelTexture;
                        }
                    }
                } else {
                    for (var i2 = 0; i2 < SirFlocksalot.Flock.NumFlock; i2 = (i2 + 1) | 0) {
                        this.Agents.getItem(i2).AgentColor = Microsoft.Xna.Framework.Color.White.$clone();
                        this.Agents.getItem(i2).DrawScale = 1.0;
                        this.Agents.getItem(i2).Texture = SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Graphics.Texture2D, this.PetalTextures);
                    }
                    for (var i3 = SirFlocksalot.Flock.NumFlock; i3 < ((SirFlocksalot.Flock.NumFlock + SirFlocksalot.Flock.NumRogue) | 0); i3 = (i3 + 1) | 0) {
                        this.Agents.getItem(i3).DrawScale = 1.0;
                        this.Agents.getItem(i3).Texture = this.RogueTexture;
                    }
                }
            },
            Reset: function () {
                SirFlocksalot.Flock.NumFlock = 47;
                SirFlocksalot.Flock.NumRogue = 3;
                this.Agents.clear();
                if (this.PetalTextures.Count > 0) {
                    for (var i = 0; i < SirFlocksalot.Flock.NumFlock; i = (i + 1) | 0) {
                        this.Agents.add(new SirFlocksalot.FlockAgent(SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Graphics.Texture2D, this.PetalTextures)));
                    }
                }
                if (this.RogueTexture != null) {
                    for (var i1 = 0; i1 < SirFlocksalot.Flock.NumRogue; i1 = (i1 + 1) | 0) {
                        this.Agents.add(new SirFlocksalot.RogueAgent(this.RogueTexture));
                    }
                }
            },
            AddFlockAgents: function (num) {
                if (num > 0) {
                    var FlockAgents = new (System.Collections.Generic.List$1(SirFlocksalot.FlockAgent)).ctor();
                    for (var i = 0; i < num; i = (i + 1) | 0) {
                        FlockAgents.add(new SirFlocksalot.FlockAgent(SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Graphics.Texture2D, this.PetalTextures)));
                    }
                    this.Agents.InsertRange(SirFlocksalot.Flock.NumFlock, FlockAgents);
                    SirFlocksalot.Flock.NumFlock = (SirFlocksalot.Flock.NumFlock + num) | 0;
                }
            },
            AddRogueAgents: function (num) {
                if (num > 0) {
                    var RogueAgents = new (System.Collections.Generic.List$1(SirFlocksalot.RogueAgent)).ctor();
                    for (var i = 0; i < num; i = (i + 1) | 0) {
                        RogueAgents.add(new SirFlocksalot.RogueAgent(this.RogueTexture));
                    }
                    this.Agents.AddRange(RogueAgents);
                    SirFlocksalot.Flock.NumRogue = (SirFlocksalot.Flock.NumRogue + num) | 0;
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
            BackgroundTexture: null,
            Moon: null,
            Flock: null,
            TimeModifier: 0,
            DownKeys: null
        },
        ctors: {
            init: function () {
                this.TimeModifier = 1.0;
                this.DownKeys = new (System.Collections.Generic.Dictionary$2(Microsoft.Xna.Framework.Input.Keys,System.Boolean))();
            },
            ctor: function () {
                this.$initialize();
                Microsoft.Xna.Framework.Game.ctor.call(this);
                this.IsMouseVisible = true;
                this.graphics = new Microsoft.Xna.Framework.GraphicsDeviceManager(this);
                this.graphics.PreferredBackBufferWidth = SirFlocksalot.SirFlocksalotGame.ScreenSize.X;
                this.graphics.PreferredBackBufferHeight = SirFlocksalot.SirFlocksalotGame.ScreenSize.Y;
                this.Content.RootDirectory = "Content";
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
                this.Flock.OnePixelTexture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "onepx");
                this.Flock.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal"));
                this.Flock.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal-blue"));
                this.Flock.PetalTextures.add(this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "petal-yellow"));
                this.Flock.RogueTexture = this.Content.Load(Microsoft.Xna.Framework.Graphics.Texture2D, "rogue");


                this.Flock.Reset();
            },
            UnloadContent: function () { },
            WasKeyDown: function (KeyToCheck) {
                return this.DownKeys.containsKey(KeyToCheck) && this.DownKeys.get(KeyToCheck);
            },
            MarkKeysDown: function () {
                var $t, $t1;
                $t = Bridge.getEnumerator(this.DownKeys);
                try {
                    while ($t.moveNext()) {
                        var pair = $t.Current;
                        this.DownKeys.set(pair.key, false);
                    }
                } finally {
                    if (Bridge.is($t, System.IDisposable)) {
                        $t.System$IDisposable$Dispose();
                    }
                }
                $t1 = Bridge.getEnumerator(Microsoft.Xna.Framework.Input.Keyboard.GetState().GetPressedKeys());
                try {
                    while ($t1.moveNext()) {
                        var key = $t1.Current;
                        if (this.DownKeys.containsKey(key)) {
                            this.DownKeys.set(key, true);
                        } else {
                            this.DownKeys.add(key, true);
                        }
                    }
                } finally {
                    if (Bridge.is($t1, System.IDisposable)) {
                        $t1.System$IDisposable$Dispose();
                    }
                }
            },
            Update: function (gameTime) {
                if (this.WasKeyDown(Microsoft.Xna.Framework.Input.Keys.Space) && Microsoft.Xna.Framework.Input.Keyboard.GetState().IsKeyUp(Microsoft.Xna.Framework.Input.Keys.Space)) {
                    this.Flock.ChangeTextures();
                }
                this.MarkKeysDown();

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
            AgentColor: null,
            DrawScale: 0,
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
                this.AgentColor = new Microsoft.Xna.Framework.Color();
                this.Velocity = new Microsoft.Xna.Framework.Vector2();
                this.Acceleration = new Microsoft.Xna.Framework.Vector2();
                this.AgentId = 0;
                this.IsRogue = false;
                this.AgentColor = Microsoft.Xna.Framework.Color.White.$clone();
                this.DrawScale = 1.0;
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
            DrawPosition: null
        },
        ctors: {
            init: function () {
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
                this.AgentColor = new Microsoft.Xna.Framework.Color.$ctor7(RGBValue, RGBValue, RGBValue, this.AgentColor.A);
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
                SB.Draw$6(this.Texture, this.DrawPosition.$clone(), this.Texture.Bounds.$clone(), this.AgentColor.$clone(), this.POrientation * Microsoft.Xna.Framework.MathHelper.TwoPi, new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), this.DrawScale, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
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
                    this.Past.getItem(i).Color.A = (this.Past.getItem(i).Color.A - 10) & 255;
                    if (this.Past.getItem(i).Color.A < 10) {
                        this.Past.removeAt(i);
                    }
                }
                if (this.Past.Count > 0) {
                    var index = SirFlocksalot.FlockTools.GetRandomInteger(this.Past.Count);
                    var PickedColor = Microsoft.Xna.Framework.Color.op_Multiply(SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Color, function (_o1) {
                            _o1.add(Microsoft.Xna.Framework.Color.LawnGreen.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.Turquoise.$clone());
                            _o1.add(Microsoft.Xna.Framework.Color.OrangeRed.$clone());
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
                        SB.Draw$6(this.Texture, p.Position.$clone(), this.Texture.Bounds.$clone(), p.Color.$clone(), 0, new Microsoft.Xna.Framework.Vector2.$ctor2(0.5, 0.5), this.DrawScale, Microsoft.Xna.Framework.Graphics.SpriteEffects.None, 0);
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VkU2lyRmxvY2tzYWxvdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiR2FtZS9TaXJGbG9ja3NhbG90R2FtZS5jcyIsIkdhbWUvRmxvY2suY3MiLCJHYW1lL0Zsb2NrVG9vbHMuY3MiLCJHYW1lL0Zsb2NrQWdlbnQuY3MiLCJHYW1lL01vb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFVWUEsYUFBYUE7WUFDYkEsZUFBZUEsQ0FBTUE7WUFDckJBLGdCQUFnQkEsQ0FBTUE7WUFDdEJBO1lBQ0FBLDBCQUFxRUE7O1lBRXJFQSxnQ0FBT0EsSUFBSUE7WUFDWEE7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NDUnNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ0dNQTs2QkFDR0E7Ozs7OzhCQUhkQSxLQUFJQTtxQ0FDY0EsS0FBSUE7Ozs7Ozs7OztnQkFPdkNBLHlCQUFvQkEsQ0FBQ0E7Z0JBQ3JCQSxJQUFJQTtvQkFFQUEsSUFBSUEsd0JBQW1CQTt3QkFFbkJBLEtBQUtBLFdBQVdBLElBQUlBLDhCQUFVQTs0QkFFMUJBLG9CQUFPQSxnQkFBZ0JBLElBQUlBOzRCQUMzQkEsb0JBQU9BOzRCQUNQQSxvQkFBT0EsYUFBYUE7O3dCQUV4QkEsS0FBS0EsU0FBUUEsOEJBQVVBLEtBQUlBLGlDQUFXQSxvQ0FBVUE7NEJBRTVDQSxvQkFBT0E7NEJBQ1BBLG9CQUFPQSxjQUFhQTs7OztvQkFNNUJBLEtBQUtBLFlBQVdBLEtBQUlBLDhCQUFVQTt3QkFFMUJBLG9CQUFPQSxpQkFBZ0JBO3dCQUN2QkEsb0JBQU9BO3dCQUNQQSxvQkFBT0EsY0FBYUEsMEVBQTJCQTs7b0JBRW5EQSxLQUFLQSxTQUFRQSw4QkFBVUEsS0FBSUEsaUNBQVdBLG9DQUFVQTt3QkFFNUNBLG9CQUFPQTt3QkFDUEEsb0JBQU9BLGNBQWFBOzs7OztnQkFNNUJBO2dCQUNBQTtnQkFDQUE7Z0JBQ0FBLElBQUlB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QkFBZUEsQUFBT0EsU0FBU0Esb0JBQWVBLG9CQUFlQSxBQUFPQSxTQUFTQTtnQkFDdkZBLFFBQVVBLG9CQUFlQSxBQUFPQSxTQUFTQSxvQkFBZUEsb0JBQWVBLEFBQU9BLFNBQVNBOztnQkFFdkZBLG9CQUF3QkEsSUFBSUEsdUNBQVFBLG1CQUFtQkEsR0FBR0EsbUJBQW1CQTtnQkFDN0VBO2dCQUNBQSw0RkFBZ0JBLHNFQUFnQkE7OzRCQUVWQTs7Z0JBRXRCQSwwQkFBMEJBOzs7O3dCQUV0QkEsVUFBUUEsY0FBU0EscUJBQVlBLDhCQUFnQkEscUJBQVlBLElBQUlBLGtEQUFxQkEsZ0JBQVdBIiwKICAic291cmNlc0NvbnRlbnQiOiBbInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTaXJGbG9ja3NhbG90O1xyXG5cclxubmFtZXNwYWNlIEJyaWRnZWRTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBBcHBcclxuICAgIHtcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBHYW1lIGdhbWU7XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyB2b2lkIE1haW4oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGNhbnZhcyA9IG5ldyBSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudCgpO1xyXG4gICAgICAgICAgICBjYW52YXMud2lkdGggPSAodWludClTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlg7XHJcbiAgICAgICAgICAgIGNhbnZhcy5oZWlnaHQgPSAodWludClTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlk7XHJcbiAgICAgICAgICAgIGNhbnZhcy5pZCA9IFwibW9ub2dhbWVjYW52YXNcIjtcclxuICAgICAgICAgICAgUmV0eXBlZC5kb20uZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZDxSZXR5cGVkLmRvbS5IVE1MQ2FudmFzRWxlbWVudD4oY2FudmFzKTtcclxuXHJcbiAgICAgICAgICAgIGdhbWUgPSBuZXcgU2lyRmxvY2tzYWxvdEdhbWUoKTtcclxuICAgICAgICAgICAgZ2FtZS5SdW4oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLklucHV0O1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBHYW1lT2JqZWN0XHJcbiAgICB7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgUG9zaXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgcHVibGljIEdhbWVPYmplY3QoKSB7IH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBTaXJGbG9ja3NhbG90R2FtZSA6IEdhbWVcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFBvaW50IFNjcmVlblNpemUgPSBuZXcgUG9pbnQoMTI4MCwgNzIwKTtcclxuICAgICAgICBHcmFwaGljc0RldmljZU1hbmFnZXIgZ3JhcGhpY3M7XHJcbiAgICAgICAgU3ByaXRlQmF0Y2ggc3ByaXRlQmF0Y2g7XHJcbiAgICAgICAgLy9TcHJpdGVGb250IERlYnVnRm9udDtcclxuICAgICAgICBUZXh0dXJlMkQgQmFja2dyb3VuZFRleHR1cmU7XHJcbiAgICAgICAgTW9vbiBNb29uO1xyXG4gICAgICAgIEZsb2NrIEZsb2NrO1xyXG4gICAgICAgIGZsb2F0IFRpbWVNb2RpZmllciA9IDEuMGY7XHJcbiAgICAgICAgcHVibGljIFNpckZsb2Nrc2Fsb3RHYW1lKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzTW91c2VWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgZ3JhcGhpY3MgPSBuZXcgR3JhcGhpY3NEZXZpY2VNYW5hZ2VyKHRoaXMpO1xyXG4gICAgICAgICAgICBncmFwaGljcy5QcmVmZXJyZWRCYWNrQnVmZmVyV2lkdGggPSBTY3JlZW5TaXplLlg7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJIZWlnaHQgPSBTY3JlZW5TaXplLlk7XHJcbiAgICAgICAgICAgIC8vSXNGaXhlZFRpbWVTdGVwID0gZ3JhcGhpY3MuU3luY2hyb25pemVXaXRoVmVydGljYWxSZXRyYWNlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIENvbnRlbnQuUm9vdERpcmVjdG9yeSA9IFwiQ29udGVudFwiO1xyXG4gICAgICAgICAgICBNb29uID0gbmV3IE1vb24oKTtcclxuICAgICAgICAgICAgRmxvY2sgPSBuZXcgRmxvY2soKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgSW5pdGlhbGl6ZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBiYXNlLkluaXRpYWxpemUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgTG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2ggPSBuZXcgU3ByaXRlQmF0Y2goR3JhcGhpY3NEZXZpY2UpO1xyXG4gICAgICAgICAgICAvL0RlYnVnRm9udCA9IENvbnRlbnQuTG9hZDxTcHJpdGVGb250PihcIkZvbnRzL0RlYnVnXCIpO1xyXG4gICAgICAgICAgICBNb29uLlRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm1vb25cIik7XHJcbiAgICAgICAgICAgIEJhY2tncm91bmRUZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJzdGFyc1wiKTtcclxuICAgICAgICAgICAgRmxvY2suT25lUGl4ZWxUZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJvbmVweFwiKTtcclxuICAgICAgICAgICAgRmxvY2suUGV0YWxUZXh0dXJlcy5BZGQoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJwZXRhbFwiKSk7XHJcbiAgICAgICAgICAgIEZsb2NrLlBldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicGV0YWwtYmx1ZVwiKSk7XHJcbiAgICAgICAgICAgIEZsb2NrLlBldGFsVGV4dHVyZXMuQWRkKENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwicGV0YWwteWVsbG93XCIpKTtcclxuICAgICAgICAgICAgRmxvY2suUm9ndWVUZXh0dXJlID0gQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJyb2d1ZVwiKTtcclxuICAgICAgICAgICAgLy8gUG9zdCBDb250ZW50IExvYWRpbmdcclxuXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBGbG9jay5SZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBVbmxvYWRDb250ZW50KClcclxuICAgICAgICB7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIERpY3Rpb25hcnk8S2V5cywgYm9vbD4gRG93bktleXMgPSBuZXcgRGljdGlvbmFyeTxLZXlzLCBib29sPigpO1xyXG4gICAgICAgIGJvb2wgV2FzS2V5RG93bihLZXlzIEtleVRvQ2hlY2spXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gRG93bktleXMuQ29udGFpbnNLZXkoS2V5VG9DaGVjaykgJiYgRG93bktleXNbS2V5VG9DaGVja107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZvaWQgTWFya0tleXNEb3duKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEtleVZhbHVlUGFpcjxLZXlzLCBib29sPiBwYWlyIGluIERvd25LZXlzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBEb3duS2V5c1twYWlyLktleV0gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JlYWNoIChLZXlzIGtleSBpbiBLZXlib2FyZC5HZXRTdGF0ZSgpLkdldFByZXNzZWRLZXlzKCkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChEb3duS2V5cy5Db250YWluc0tleShrZXkpKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERvd25LZXlzW2tleV0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIERvd25LZXlzLkFkZChrZXksIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVwZGF0ZShHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKFdhc0tleURvd24oS2V5cy5TcGFjZSkgJiYgS2V5Ym9hcmQuR2V0U3RhdGUoKS5Jc0tleVVwKEtleXMuU3BhY2UpKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBGbG9jay5DaGFuZ2VUZXh0dXJlcygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE1hcmtLZXlzRG93bigpO1xyXG4gICAgICAgICBcclxuICAgICAgICAgICAgZmxvYXQgRGVsdGFUaW1lID0gKGZsb2F0KWdhbWVUaW1lLkVsYXBzZWRHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIGZsb2F0IEN1cnJlbnRUaW1lID0gKGZsb2F0KWdhbWVUaW1lLlRvdGFsR2FtZVRpbWUuVG90YWxTZWNvbmRzO1xyXG4gICAgICAgICAgICBNb29uLlVwZGF0ZShEZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBGbG9jay5VcGRhdGUoQ3VycmVudFRpbWUsIERlbHRhVGltZSwgVGltZU1vZGlmaWVyKTtcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIERyYXcoR2FtZVRpbWUgZ2FtZVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBmcmFtZVJhdGUgPSAxIC8gKGZsb2F0KWdhbWVUaW1lLkVsYXBzZWRHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIEdyYXBoaWNzRGV2aWNlLkNsZWFyKG5ldyBDb2xvcigwKSk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkJlZ2luKFNwcml0ZVNvcnRNb2RlLkRlZmVycmVkLCBCbGVuZFN0YXRlLk5vblByZW11bHRpcGxpZWQpO1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaC5EcmF3KEJhY2tncm91bmRUZXh0dXJlLCBuZXcgUmVjdGFuZ2xlKDAsIDAsIFNjcmVlblNpemUuWCwgU2NyZWVuU2l6ZS5ZKSwgQ29sb3IuV2hpdGUpO1xyXG4gICAgICAgICAgICBNb29uLkRyYXcoc3ByaXRlQmF0Y2gpO1xyXG4gICAgICAgICAgICBGbG9jay5EcmF3KHNwcml0ZUJhdGNoKTtcclxuICAgICAgICAgICAgLy9zcHJpdGVCYXRjaC5EcmF3U3RyaW5nKERlYnVnRm9udCwgc3RyaW5nLkZvcm1hdChcInswfSAoRlBTKVwiLCBmcmFtZVJhdGUpLCBuZXcgVmVjdG9yMigxMCwgMTApLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkVuZCgpO1xyXG5cclxuICAgICAgICAgICAgYmFzZS5EcmF3KGdhbWVUaW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBGbG9ja1xyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgaW50IE51bUZsb2NrID0gNDc7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBpbnQgTnVtUm9ndWUgPSAzO1xyXG4gICAgICAgIExpc3Q8QWdlbnQ+IEFnZW50cyA9IG5ldyBMaXN0PEFnZW50PigpO1xyXG4gICAgICAgIHB1YmxpYyBMaXN0PFRleHR1cmUyRD4gUGV0YWxUZXh0dXJlcyA9IG5ldyBMaXN0PFRleHR1cmUyRD4oKTtcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIFJvZ3VlVGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBPbmVQaXhlbFRleHR1cmUgPSBudWxsO1xyXG4gICAgICAgIGJvb2wgSXNEcmF3aW5nRm9yRGVidWcgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgRmxvY2soKSB7IH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBDaGFuZ2VUZXh0dXJlcygpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBJc0RyYXdpbmdGb3JEZWJ1ZyA9ICFJc0RyYXdpbmdGb3JEZWJ1ZztcclxuICAgICAgICAgICAgaWYgKElzRHJhd2luZ0ZvckRlYnVnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoT25lUGl4ZWxUZXh0dXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1GbG9jazsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLkFnZW50Q29sb3IgPSBuZXcgQ29sb3IoMjU1LCAyNTUsIDI1NSwgNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uRHJhd1NjYWxlID0gMTYuMGY7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5UZXh0dXJlID0gT25lUGl4ZWxUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gTnVtRmxvY2s7IGkgPCBOdW1GbG9jayArIE51bVJvZ3VlOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uRHJhd1NjYWxlID0gMy4wZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLlRleHR1cmUgPSBPbmVQaXhlbFRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1GbG9jazsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5BZ2VudENvbG9yID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLkRyYXdTY2FsZSA9IDEuMGY7XHJcbiAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLlRleHR1cmUgPSBGbG9ja1Rvb2xzLlBpY2s8VGV4dHVyZTJEPihQZXRhbFRleHR1cmVzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSBOdW1GbG9jazsgaSA8IE51bUZsb2NrICsgTnVtUm9ndWU7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uRHJhd1NjYWxlID0gMS4wZjtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uVGV4dHVyZSA9IFJvZ3VlVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBSZXNldCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBOdW1GbG9jayA9IDQ3O1xyXG4gICAgICAgICAgICBOdW1Sb2d1ZSA9IDM7XHJcbiAgICAgICAgICAgIEFnZW50cy5DbGVhcigpO1xyXG4gICAgICAgICAgICBpZiAoUGV0YWxUZXh0dXJlcy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgTnVtRmxvY2s7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHMuQWRkKG5ldyBGbG9ja0FnZW50KEZsb2NrVG9vbHMuUGljazxUZXh0dXJlMkQ+KFBldGFsVGV4dHVyZXMpKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFJvZ3VlVGV4dHVyZSAhPSBudWxsKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IE51bVJvZ3VlOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWdlbnRzLkFkZChuZXcgUm9ndWVBZ2VudChSb2d1ZVRleHR1cmUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRGbG9ja0FnZW50cyhpbnQgbnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG51bSA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExpc3Q8RmxvY2tBZ2VudD4gRmxvY2tBZ2VudHMgPSBuZXcgTGlzdDxGbG9ja0FnZW50PigpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBudW07IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBGbG9ja0FnZW50cy5BZGQobmV3IEZsb2NrQWdlbnQoRmxvY2tUb29scy5QaWNrPFRleHR1cmUyRD4oUGV0YWxUZXh0dXJlcykpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEFnZW50cy5JbnNlcnRSYW5nZShOdW1GbG9jaywgRmxvY2tBZ2VudHMpO1xyXG4gICAgICAgICAgICAgICAgTnVtRmxvY2sgKz0gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgdm9pZCBBZGRSb2d1ZUFnZW50cyhpbnQgbnVtKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKG51bSA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIExpc3Q8Um9ndWVBZ2VudD4gUm9ndWVBZ2VudHMgPSBuZXcgTGlzdDxSb2d1ZUFnZW50PigpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBudW07IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBSb2d1ZUFnZW50cy5BZGQobmV3IFJvZ3VlQWdlbnQoUm9ndWVUZXh0dXJlKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBBZ2VudHMuQWRkUmFuZ2UoUm9ndWVBZ2VudHMpO1xyXG4gICAgICAgICAgICAgICAgTnVtUm9ndWUgKz0gbnVtO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYS5VcGRhdGUoQ3VycmVudFRpbWUsIERlbHRhVGltZSwgVGltZU1vZGlmaWVyLCBBZ2VudHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoIChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYS5EcmF3KFNCKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgU3lzdGVtO1xyXG51c2luZyBTeXN0ZW0uQ29sbGVjdGlvbnMuR2VuZXJpYztcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHN0YXRpYyBjbGFzcyBGbG9ja1Rvb2xzXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIFJhbmRvbSBSYW5kb21pemVyID0gbmV3IFJhbmRvbSgpO1xyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgZmxvYXQgR2V0UmFuZG9tRmxvYXQoZmxvYXQgVmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KVJhbmRvbWl6ZXIuTmV4dERvdWJsZSgpICogVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0YXRpYyBwdWJsaWMgZmxvYXQgR2V0UmFuZG9tRmxvYXQoZmxvYXQgTWluLCBmbG9hdCBNYXgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBBYnNUb3RhbCA9IChmbG9hdClNYXRoLkFicyhNaW4pICsgKGZsb2F0KU1hdGguQWJzKE1heCk7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpUmFuZG9taXplci5OZXh0RG91YmxlKCkgKiBBYnNUb3RhbCArIE1pbjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBNYXAoZmxvYXQgdmFsdWUsIGZsb2F0IGZyb21Tb3VyY2UsIGZsb2F0IHRvU291cmNlLCBmbG9hdCBmcm9tVGFyZ2V0LCBmbG9hdCB0b1RhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgLSBmcm9tU291cmNlKSAvICh0b1NvdXJjZSAtIGZyb21Tb3VyY2UpICogKHRvVGFyZ2V0IC0gZnJvbVRhcmdldCkgKyBmcm9tVGFyZ2V0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTGltaXQocmVmIFZlY3RvcjIgVmVjdG9yLCBmbG9hdCBMaW1pdFNxdWFyZWQsIGZsb2F0IExpbWl0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5MZW5ndGhTcXVhcmVkKCkgPiBMaW1pdFNxdWFyZWQpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIFZlY3RvciA9IFZlY3RvciAqIExpbWl0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgZmxvYXQgSGVhZGluZyh0aGlzIFZlY3RvcjIgVmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClNYXRoLkF0YW4yKFZlY3Rvci5ZLCBWZWN0b3IuWCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVmVjdG9yMiBHZXRTYWZlTm9ybWFsKFZlY3RvcjIgVmVjdG9yKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoVmVjdG9yLkxlbmd0aFNxdWFyZWQoKSA+IDAuMDFmKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5Ob3JtYWxpemUoVmVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwdWJsaWMgc3RhdGljIFQgUGljazxUPihMaXN0PFQ+IE9wdGlvbnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoT3B0aW9ucy5Db3VudCA+IDApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPcHRpb25zW1JhbmRvbWl6ZXIuTmV4dChPcHRpb25zLkNvdW50KV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgV3JhcFZlY3RvcihyZWYgVmVjdG9yMiBWZWN0b3IsIFZlY3RvcjIgQm91bmRzLCBmbG9hdCBFcnJvclRvbGVyYW5jZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IFJpZ2h0ID0gQm91bmRzLlggKyBFcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgZmxvYXQgTGVmdCA9IC1FcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5YID4gUmlnaHQpXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWCA9IExlZnQ7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKFZlY3Rvci5YIDwgTGVmdClcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5YID0gUmlnaHQ7XHJcbiAgICAgICAgICAgIGZsb2F0IFRvcCA9IC1FcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgZmxvYXQgQm90dG9tID0gQm91bmRzLlkgKyBFcnJvclRvbGVyYW5jZTtcclxuICAgICAgICAgICAgaWYgKFZlY3Rvci5ZID4gQm90dG9tKVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlkgPSBUb3A7XHJcbiAgICAgICAgICAgIGVsc2UgaWYgKFZlY3Rvci5ZIDwgVG9wKVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlkgPSBCb3R0b207XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgaW50IEdldFJhbmRvbUludGVnZXIoaW50IE1heFZhbHVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJhbmRvbWl6ZXIuTmV4dChNYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCBzdGF0aWMgVmVjdG9yMiBHZXRSYW5kb21WZWN0b3IyKGZsb2F0IE1pblgsIGZsb2F0IE1heFgsIGZsb2F0IE1pblksIGZsb2F0IE1heFkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZlY3RvcjIoR2V0UmFuZG9tRmxvYXQoTWluWCwgTWF4WCksIEdldFJhbmRvbUZsb2F0KE1pblksIE1heFkpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGNsYXNzIE5vaXNlXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIE5vaXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgNTEyOyBpKyspXHJcbiAgICAgICAgICAgICAgICBwZXJtW2ldID0gcFtpICYgMjU1XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gc2ltcGxleCBub2lzZSBpbiAyRCwgM0QgYW5kIDREXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W11bXSBncmFkMyA9IG5ldyBpbnRbXVtdIHtcclxuICAgICAgICBuZXcgaW50W10gezEsMSwwfSwgbmV3IGludFtdIHstMSwxLDB9LCBuZXcgaW50W10gezEsLTEsMH0sIG5ldyBpbnRbXSB7LTEsLTEsMH0sXHJcbiAgICAgICAgbmV3IGludFtdIHsxLDAsMX0sIG5ldyBpbnRbXSB7LTEsMCwxfSwgbmV3IGludFtdIHsxLDAsLTF9LCBuZXcgaW50W10gey0xLDAsLTF9LFxyXG4gICAgICAgIG5ldyBpbnRbXSB7MCwxLDF9LCBuZXcgaW50W10gezAsLTEsMX0sIG5ldyBpbnRbXSB7MCwxLC0xfSwgbmV3IGludFtdIHswLC0xLC0xfVxyXG4gICAgfTtcclxuXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W10gcCA9IHsxNTEsMTYwLDEzNyw5MSw5MCwxNSxcclxuICAgICAgICAxMzEsMTMsMjAxLDk1LDk2LDUzLDE5NCwyMzMsNywyMjUsMTQwLDM2LDEwMywzMCw2OSwxNDIsOCw5OSwzNywyNDAsMjEsMTAsMjMsXHJcbiAgICAgICAgMTkwLCA2LDE0OCwyNDcsMTIwLDIzNCw3NSwwLDI2LDE5Nyw2Miw5NCwyNTIsMjE5LDIwMywxMTcsMzUsMTEsMzIsNTcsMTc3LDMzLFxyXG4gICAgICAgIDg4LDIzNywxNDksNTYsODcsMTc0LDIwLDEyNSwxMzYsMTcxLDE2OCwgNjgsMTc1LDc0LDE2NSw3MSwxMzQsMTM5LDQ4LDI3LDE2NixcclxuICAgICAgICA3NywxNDYsMTU4LDIzMSw4MywxMTEsMjI5LDEyMiw2MCwyMTEsMTMzLDIzMCwyMjAsMTA1LDkyLDQxLDU1LDQ2LDI0NSw0MCwyNDQsXHJcbiAgICAgICAgMTAyLDE0Myw1NCwgNjUsMjUsNjMsMTYxLCAxLDIxNiw4MCw3MywyMDksNzYsMTMyLDE4NywyMDgsIDg5LDE4LDE2OSwyMDAsMTk2LFxyXG4gICAgICAgIDEzNSwxMzAsMTE2LDE4OCwxNTksODYsMTY0LDEwMCwxMDksMTk4LDE3MywxODYsIDMsNjQsNTIsMjE3LDIyNiwyNTAsMTI0LDEyMyxcclxuICAgICAgICA1LDIwMiwzOCwxNDcsMTE4LDEyNiwyNTUsODIsODUsMjEyLDIwNywyMDYsNTksMjI3LDQ3LDE2LDU4LDE3LDE4MiwxODksMjgsNDIsXHJcbiAgICAgICAgMjIzLDE4MywxNzAsMjEzLDExOSwyNDgsMTUyLCAyLDQ0LDE1NCwxNjMsIDcwLDIyMSwxNTMsMTAxLDE1NSwxNjcsIDQzLDE3Miw5LFxyXG4gICAgICAgIDEyOSwyMiwzOSwyNTMsIDE5LDk4LDEwOCwxMTAsNzksMTEzLDIyNCwyMzIsMTc4LDE4NSwgMTEyLDEwNCwyMTgsMjQ2LDk3LDIyOCxcclxuICAgICAgICAyNTEsMzQsMjQyLDE5MywyMzgsMjEwLDE0NCwxMiwxOTEsMTc5LDE2MiwyNDEsIDgxLDUxLDE0NSwyMzUsMjQ5LDE0LDIzOSwxMDcsXHJcbiAgICAgICAgNDksMTkyLDIxNCwgMzEsMTgxLDE5OSwxMDYsMTU3LDE4NCwgODQsMjA0LDE3NiwxMTUsMTIxLDUwLDQ1LDEyNywgNCwxNTAsMjU0LFxyXG4gICAgICAgIDEzOCwyMzYsMjA1LDkzLDIyMiwxMTQsNjcsMjksMjQsNzIsMjQzLDE0MSwxMjgsMTk1LDc4LDY2LDIxNSw2MSwxNTYsMTgwfTtcclxuICAgICAgICAvLyBUbyByZW1vdmUgdGhlIG5lZWQgZm9yIGluZGV4IHdyYXBwaW5nLCBkb3VibGUgdGhlIHBlcm11dGF0aW9uIHRhYmxlIGxlbmd0aFxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGludFtdIHBlcm0gPSBuZXcgaW50WzUxMl07XHJcblxyXG4gICAgICAgIC8vIFRoaXMgbWV0aG9kIGlzIGEgKmxvdCogZmFzdGVyIHRoYW4gdXNpbmcgKGludClNYXRoLmZsb29yKHgpXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50IGZhc3RmbG9vcihkb3VibGUgeClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB4ID4gMCA/IChpbnQpeCA6IChpbnQpeCAtIDE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBkb3VibGUgZG90KGludFtdIGcsIGRvdWJsZSB4LCBkb3VibGUgeSwgZG91YmxlIHopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZ1swXSAqIHggKyBnWzFdICogeSArIGdbMl0gKiB6O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBHZXROb2lzZShkb3VibGUgcFgsIGRvdWJsZSBwWSwgZG91YmxlIHBaKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZG91YmxlIG4wLCBuMSwgbjIsIG4zOyAvLyBOb2lzZSBjb250cmlidXRpb25zIGZyb20gdGhlIGZvdXIgY29ybmVyc1xyXG4gICAgICAgICAgICAvLyBTa2V3IHRoZSBpbnB1dCBzcGFjZSB0byBkZXRlcm1pbmUgd2hpY2ggc2ltcGxleCBjZWxsIHdlJ3JlIGluXHJcbiAgICAgICAgICAgIGRvdWJsZSBGMyA9IDEuMCAvIDMuMDtcclxuICAgICAgICAgICAgZG91YmxlIHMgPSAocFggKyBwWSArIHBaKSAqIEYzOyAvLyBWZXJ5IG5pY2UgYW5kIHNpbXBsZSBza2V3IGZhY3RvciBmb3IgM0RcclxuICAgICAgICAgICAgaW50IGkgPSBmYXN0Zmxvb3IocFggKyBzKTtcclxuICAgICAgICAgICAgaW50IGogPSBmYXN0Zmxvb3IocFkgKyBzKTtcclxuICAgICAgICAgICAgaW50IGsgPSBmYXN0Zmxvb3IocFogKyBzKTtcclxuICAgICAgICAgICAgZG91YmxlIEczID0gMS4wIC8gNi4wOyAvLyBWZXJ5IG5pY2UgYW5kIHNpbXBsZSB1bnNrZXcgZmFjdG9yLCB0b29cclxuICAgICAgICAgICAgZG91YmxlIHQgPSAoaSArIGogKyBrKSAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgWDAgPSBpIC0gdDsgLy8gVW5za2V3IHRoZSBjZWxsIG9yaWdpbiBiYWNrIHRvICh4LHkseikgc3BhY2VcclxuICAgICAgICAgICAgZG91YmxlIFkwID0gaiAtIHQ7XHJcbiAgICAgICAgICAgIGRvdWJsZSBaMCA9IGsgLSB0O1xyXG4gICAgICAgICAgICBkb3VibGUgeDAgPSBwWCAtIFgwOyAvLyBUaGUgeCx5LHogZGlzdGFuY2VzIGZyb20gdGhlIGNlbGwgb3JpZ2luXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MCA9IHBZIC0gWTA7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MCA9IHBaIC0gWjA7XHJcbiAgICAgICAgICAgIC8vIEZvciB0aGUgM0QgY2FzZSwgdGhlIHNpbXBsZXggc2hhcGUgaXMgYSBzbGlnaHRseSBpcnJlZ3VsYXIgdGV0cmFoZWRyb24uXHJcbiAgICAgICAgICAgIC8vIERldGVybWluZSB3aGljaCBzaW1wbGV4IHdlIGFyZSBpbi5cclxuICAgICAgICAgICAgaW50IGkxLCBqMSwgazE7IC8vIE9mZnNldHMgZm9yIHNlY29uZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgICAgICBpbnQgaTIsIGoyLCBrMjsgLy8gT2Zmc2V0cyBmb3IgdGhpcmQgY29ybmVyIG9mIHNpbXBsZXggaW4gKGksaixrKSBjb29yZHNcclxuICAgICAgICAgICAgaWYgKHgwID49IHkwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZiAoeTAgPj0gejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDA7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFggWSBaIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4MCA+PSB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWCBaIFkgb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWiBYIFkgb3JkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHsgLy8geDA8eTBcclxuICAgICAgICAgICAgICAgIGlmICh5MCA8IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBaIFkgWCBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoeDAgPCB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMTtcclxuICAgICAgICAgICAgICAgIH0gLy8gWSBaIFggb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMDtcclxuICAgICAgICAgICAgICAgIH0gLy8gWSBYIFogb3JkZXJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBIHN0ZXAgb2YgKDEsMCwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoMS1jLC1jLC1jKSBpbiAoeCx5LHopLFxyXG4gICAgICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMSwwKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsMS1jLC1jKSBpbiAoeCx5LHopLCBhbmRcclxuICAgICAgICAgICAgLy8gYSBzdGVwIG9mICgwLDAsMSkgaW4gKGksaixrKSBtZWFucyBhIHN0ZXAgb2YgKC1jLC1jLDEtYykgaW4gKHgseSx6KSwgd2hlcmVcclxuICAgICAgICAgICAgLy8gYyA9IDEvNi5cclxuXHJcbiAgICAgICAgICAgIGRvdWJsZSB4MSA9IHgwIC0gaTEgKyBHMzsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xyXG4gICAgICAgICAgICBkb3VibGUgeTEgPSB5MCAtIGoxICsgRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MSA9IHowIC0gazEgKyBHMztcclxuICAgICAgICAgICAgZG91YmxlIHgyID0geDAgLSBpMiArIDIuMCAqIEczOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcclxuICAgICAgICAgICAgZG91YmxlIHkyID0geTAgLSBqMiArIDIuMCAqIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgejIgPSB6MCAtIGsyICsgMi4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB4MyA9IHgwIC0gMS4wICsgMy4wICogRzM7IC8vIE9mZnNldHMgZm9yIGxhc3QgY29ybmVyIGluICh4LHkseikgY29vcmRzXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MyA9IHkwIC0gMS4wICsgMy4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MyA9IHowIC0gMS4wICsgMy4wICogRzM7XHJcbiAgICAgICAgICAgIC8vIFdvcmsgb3V0IHRoZSBoYXNoZWQgZ3JhZGllbnQgaW5kaWNlcyBvZiB0aGUgZm91ciBzaW1wbGV4IGNvcm5lcnNcclxuICAgICAgICAgICAgaW50IGlpID0gaSAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGpqID0gaiAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGtrID0gayAmIDI1NTtcclxuICAgICAgICAgICAgaW50IGdpMCA9IHBlcm1baWkgKyBwZXJtW2pqICsgcGVybVtra11dXSAlIDEyO1xyXG4gICAgICAgICAgICBpbnQgZ2kxID0gcGVybVtpaSArIGkxICsgcGVybVtqaiArIGoxICsgcGVybVtrayArIGsxXV1dICUgMTI7XHJcbiAgICAgICAgICAgIGludCBnaTIgPSBwZXJtW2lpICsgaTIgKyBwZXJtW2pqICsgajIgKyBwZXJtW2trICsgazJdXV0gJSAxMjtcclxuICAgICAgICAgICAgaW50IGdpMyA9IHBlcm1baWkgKyAxICsgcGVybVtqaiArIDEgKyBwZXJtW2trICsgMV1dXSAlIDEyO1xyXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNvbnRyaWJ1dGlvbiBmcm9tIHRoZSBmb3VyIGNvcm5lcnNcclxuICAgICAgICAgICAgZG91YmxlIHQwID0gMC42IC0geDAgKiB4MCAtIHkwICogeTAgLSB6MCAqIHowO1xyXG4gICAgICAgICAgICBpZiAodDAgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjAgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDAgKj0gdDA7XHJcbiAgICAgICAgICAgICAgICBuMCA9IHQwICogdDAgKiBkb3QoZ3JhZDNbZ2kwXSwgeDAsIHkwLCB6MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQxID0gMC42IC0geDEgKiB4MSAtIHkxICogeTEgLSB6MSAqIHoxO1xyXG4gICAgICAgICAgICBpZiAodDEgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjEgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDEgKj0gdDE7XHJcbiAgICAgICAgICAgICAgICBuMSA9IHQxICogdDEgKiBkb3QoZ3JhZDNbZ2kxXSwgeDEsIHkxLCB6MSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQyID0gMC42IC0geDIgKiB4MiAtIHkyICogeTIgLSB6MiAqIHoyO1xyXG4gICAgICAgICAgICBpZiAodDIgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjIgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDIgKj0gdDI7XHJcbiAgICAgICAgICAgICAgICBuMiA9IHQyICogdDIgKiBkb3QoZ3JhZDNbZ2kyXSwgeDIsIHkyLCB6Mik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZG91YmxlIHQzID0gMC42IC0geDMgKiB4MyAtIHkzICogeTMgLSB6MyAqIHozO1xyXG4gICAgICAgICAgICBpZiAodDMgPCAwKVxyXG4gICAgICAgICAgICAgICAgbjMgPSAwLjA7XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdDMgKj0gdDM7XHJcbiAgICAgICAgICAgICAgICBuMyA9IHQzICogdDMgKiBkb3QoZ3JhZDNbZ2kzXSwgeDMsIHkzLCB6Myk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gQWRkIGNvbnRyaWJ1dGlvbnMgZnJvbSBlYWNoIGNvcm5lciB0byBnZXQgdGhlIGZpbmFsIG5vaXNlIHZhbHVlLlxyXG4gICAgICAgICAgICAvLyBUaGUgcmVzdWx0IGlzIHNjYWxlZCB0byBzdGF5IGp1c3QgaW5zaWRlIFstMSwgMV0gLSBub3cgWzAsIDFdXHJcbiAgICAgICAgICAgIHJldHVybiAoMzIuMGYgKiAoZmxvYXQpKG4wICsgbjEgKyBuMiArIG4zKSArIDEpICogMC41ZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3RcclxueyAgICBcclxuICAgIHB1YmxpYyBjbGFzcyBBZ2VudCA6IEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgaW50IEN1cnJlbnRBZ2VudElkID0gMDtcclxuXHJcbiAgICAgICAgcHVibGljIFRleHR1cmUyRCBUZXh0dXJlO1xyXG4gICAgICAgIHB1YmxpYyBpbnQgQWdlbnRJZCA9IDA7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNSb2d1ZSA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBDb2xvciBBZ2VudENvbG9yID0gQ29sb3IuV2hpdGU7XHJcbiAgICAgICAgcHVibGljIGZsb2F0IERyYXdTY2FsZSA9IDEuMGY7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgVmVsb2NpdHkgPSBWZWN0b3IyLk9uZTtcclxuICAgICAgICBwcm90ZWN0ZWQgVmVjdG9yMiBBY2NlbGVyYXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE9yaWVudGF0aW9uID0gMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4Rm9yY2UgPSA1ZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4Rm9yY2VTcWFyZWQgPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhTcGVlZCA9IDEwMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4U3BlZWRTcXVhcmVkID0gMC4wZjtcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgTWF4VHVyblJhdGUgPSAwLjYyODMxODU0OEY7XHJcblxyXG5cclxuICAgICAgICBwdWJsaWMgQWdlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWdlbnRJZCA9IEN1cnJlbnRBZ2VudElkKys7XHJcbiAgICAgICAgICAgIE1heEZvcmNlU3FhcmVkID0gTWF4Rm9yY2UgKiBNYXhGb3JjZTtcclxuICAgICAgICAgICAgTWF4U3BlZWRTcXVhcmVkID0gTWF4U3BlZWQgKiBNYXhTcGVlZDtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMihGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KFNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuWCksIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5ZKSk7XHJcbiAgICAgICAgICAgIGZsb2F0IFF1YXJ0ZXJTcGVlZCA9IE1heFNwZWVkICogMC4yNWY7XHJcbiAgICAgICAgICAgIFZlbG9jaXR5ID0gRmxvY2tUb29scy5HZXRSYW5kb21WZWN0b3IyKC1RdWFydGVyU3BlZWQsIFF1YXJ0ZXJTcGVlZCwgLVF1YXJ0ZXJTcGVlZCwgUXVhcnRlclNwZWVkKTtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSBWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllciwgTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5MaW1pdChyZWYgQWNjZWxlcmF0aW9uLCBNYXhGb3JjZVNxYXJlZCwgTWF4Rm9yY2UpO1xyXG4gICAgICAgICAgICBWZWxvY2l0eSArPSBBY2NlbGVyYXRpb247XHJcbiAgICAgICAgICAgIEZsb2NrVG9vbHMuTGltaXQocmVmIFZlbG9jaXR5LCBNYXhTcGVlZFNxdWFyZWQsIE1heFNwZWVkKTtcclxuICAgICAgICAgICAgaWYoVmVsb2NpdHkuTGVuZ3RoU3F1YXJlZCgpID4gMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgT3JpZW50YXRpb24gPSBWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUG9zaXRpb24gKz0gVmVsb2NpdHkgKiBEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIEZsb2NrVG9vbHMuV3JhcFZlY3RvcihyZWYgUG9zaXRpb24sIFNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuVG9WZWN0b3IyKCksIDEwMCk7XHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiAqPSAwLjlmO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgdmlydHVhbCB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpIHsgfVxyXG4gICAgICAgIHByb3RlY3RlZCBWZWN0b3IyIFNlZWsoVmVjdG9yMiBUYXJnZXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIGRlc2lyZWRWZWxvY2l0eSA9IFZlY3RvcjIuU3VidHJhY3QoVGFyZ2V0LCBQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIGRlc2lyZWRWZWxvY2l0eS5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgZmxvYXQgZGVzaXJlZEhlYWRpbmcgPSBkZXNpcmVkVmVsb2NpdHkuSGVhZGluZygpO1xyXG4gICAgICAgICAgICBmbG9hdCBoZWFkaW5nRGlmZiA9IGRlc2lyZWRIZWFkaW5nIC0gT3JpZW50YXRpb247XHJcbiAgICAgICAgICAgIGlmKGhlYWRpbmdEaWZmID4gTWF0aC5QSSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZ0RpZmYgPSAtKE1hdGhIZWxwZXIuVHdvUGkgLSBoZWFkaW5nRGlmZik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZiAoaGVhZGluZ0RpZmYgPCAtTWF0aC5QSSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaGVhZGluZ0RpZmYgPSBNYXRoSGVscGVyLlR3b1BpIC0gKGZsb2F0KU1hdGguQWJzKGhlYWRpbmdEaWZmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbG9hdCB0dXJuRGVsdGEgPSBNYXRoSGVscGVyLkNsYW1wKGhlYWRpbmdEaWZmLCAtTWF4VHVyblJhdGUsIE1heFR1cm5SYXRlKTtcclxuICAgICAgICAgICAgZmxvYXQgZGVzaXJlID0gT3JpZW50YXRpb24gKyB0dXJuRGVsdGE7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMigoZmxvYXQpTWF0aC5Db3MoZGVzaXJlKSAqIE1heFNwZWVkLCAoZmxvYXQpTWF0aC5TaW4oZGVzaXJlKSAqIE1heFNwZWVkKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgRmxvY2tBZ2VudCA6IEFnZW50XHJcbiAgICB7ICAgICAgICBcclxuICAgICAgICBpbnQgTnVtTmVpZ2hib3JzID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0Rpc3RhbmNlID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0Rpc3RhbmNlU3FhcmVkID0gMDtcclxuICAgICAgICBmbG9hdCBGbG9ja0FuZ2xlID0gMDtcclxuICAgICAgICBmbG9hdCBDb2hlc2lvbldlaWdodCA9IDA7XHJcbiAgICAgICAgZmxvYXQgU2VwYXJhdGlvbldlaWdodCA9IDA7XHJcbiAgICAgICAgZmxvYXQgQWxpZ25tZW50V2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBQZXJsaW5CZWF0ID0gMDtcclxuICAgICAgICBmbG9hdCBQUmFkaXVzID0gNTA7XHJcbiAgICAgICAgZmxvYXQgUFRoZXRhID0gMDtcclxuICAgICAgICBmbG9hdCBQT3JpZW50YXRpb24gPSAwO1xyXG4gICAgICAgIGZsb2F0IENvbG9yRmFsbG9mZiA9IDA7XHJcbiAgICAgICBcclxuICAgICAgICBWZWN0b3IyIERyYXdQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwdWJsaWMgRmxvY2tBZ2VudChUZXh0dXJlMkQgQWdlbnRUZXh0dXJlKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgVGV4dHVyZSA9IEFnZW50VGV4dHVyZTtcclxuICAgICAgICAgICAgTWF4Rm9yY2UgPSAxMDtcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBGbG9ja0Rpc3RhbmNlID0gODAgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KDMwLjBmKTtcclxuICAgICAgICAgICAgRmxvY2tEaXN0YW5jZVNxYXJlZCA9IEZsb2NrRGlzdGFuY2UgKiBGbG9ja0Rpc3RhbmNlO1xyXG4gICAgICAgICAgICBGbG9ja0FuZ2xlID0gKGZsb2F0KU1hdGguUEkgLSBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KChmbG9hdClNYXRoLlBJICogMC41Zik7XHJcbiAgICAgICAgICAgIENvaGVzaW9uV2VpZ2h0ID0gMC4zZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4zZikgLSAwLjFmO1xyXG4gICAgICAgICAgICBTZXBhcmF0aW9uV2VpZ2h0ID0gMC4yZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4yNWYpIC0gMC4xZjtcclxuICAgICAgICAgICAgQWxpZ25tZW50V2VpZ2h0ID0gMC4zZiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMC4yNWYpIC0gMC4wNWY7XHJcbiAgICAgICAgICAgIFBUaGV0YSA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoTWF0aEhlbHBlci5Ud29QaSk7XHJcbiAgICAgICAgICAgIFBlcmxpbkJlYXQgPSBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KC0wLjAxZiwgMC4wMWYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmbG9hdCBtb2RfRFQgPSBEZWx0YVRpbWUgKiBUaW1lTW9kaWZpZXI7XHJcbiAgICAgICAgICAgIFVwZGF0ZUNvbG9yKG1vZF9EVCk7XHJcbiAgICAgICAgICAgIExpc3Q8QWdlbnQ+IG5laWdoYm9ycyA9IEZpbmROZWlnaGJvcnMoQWdlbnRzKTtcclxuICAgICAgICAgICAgRmxpdChDdXJyZW50VGltZSwgbW9kX0RUKTtcclxuICAgICAgICAgICAgVmVjdG9yMiBmbG9ja2luZ0ZvcmNlID0gRmxvY2sobmVpZ2hib3JzKTsgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSBmbG9ja2luZ0ZvcmNlOyAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKEN1cnJlbnRUaW1lLCBtb2RfRFQsIFRpbWVNb2RpZmllciwgQWdlbnRzKTtcclxuICAgICAgICAgICAgZmxvYXQgY29zVGhldGEgPSAoZmxvYXQpTWF0aC5Db3MoUFRoZXRhKSAqIFBSYWRpdXM7XHJcbiAgICAgICAgICAgIGZsb2F0IHNpblRoZXRhID0gKGZsb2F0KU1hdGguU2luKFBUaGV0YSkgKiBQUmFkaXVzO1xyXG4gICAgICAgICAgICBEcmF3UG9zaXRpb24gPSBQb3NpdGlvbiArIG5ldyBWZWN0b3IyKGNvc1RoZXRhIC0gc2luVGhldGEsIGNvc1RoZXRhICsgc2luVGhldGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2b2lkIFVwZGF0ZUNvbG9yKGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IEFkZGl0aXZlQ2hhbmdlID0gKE51bU5laWdoYm9ycyAtIDEpICogMjAgKiBEZWx0YVRpbWU7XHJcbiAgICAgICAgICAgIENvbG9yRmFsbG9mZiA9IE1hdGhIZWxwZXIuQ2xhbXAoQ29sb3JGYWxsb2ZmICsgQWRkaXRpdmVDaGFuZ2UsIDAsIDIwMCk7XHJcbiAgICAgICAgICAgIGludCBSR0JWYWx1ZSA9IChpbnQpQ29sb3JGYWxsb2ZmICsgNTU7XHJcbiAgICAgICAgICAgIEFnZW50Q29sb3IgPSBuZXcgQ29sb3IoUkdCVmFsdWUsIFJHQlZhbHVlLCBSR0JWYWx1ZSwgQWdlbnRDb2xvci5BKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHJpdmF0ZSBMaXN0PEFnZW50PiBGaW5kTmVpZ2hib3JzKExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIExpc3Q8QWdlbnQ+IG5lYXJieSA9IG5ldyBMaXN0PEFnZW50PigpO1xyXG4gICAgICAgICAgICBmbG9hdCBhMSA9IC1GbG9ja0FuZ2xlO1xyXG4gICAgICAgICAgICBmbG9hdCBhMiA9IEZsb2NrQW5nbGU7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGlyID0gRmxvY2tUb29scy5HZXRTYWZlTm9ybWFsKFZlbG9jaXR5KTtcclxuICAgICAgICAgICAgZm9yZWFjaChBZ2VudCBhIGluIEFnZW50cylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoQWdlbnRJZCAhPSBhLkFnZW50SWQpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgVmVjdG9yMiB0b05laWdoYm9yID0gVmVjdG9yMi5TdWJ0cmFjdChhLlBvc2l0aW9uLCBQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgZmxvYXQgZHNxID0gdG9OZWlnaGJvci5MZW5ndGhTcXVhcmVkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZHNxIDwgRmxvY2tEaXN0YW5jZVNxYXJlZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvTmVpZ2hib3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IGRvdFByb2R1Y3QgPSBWZWN0b3IyLkRvdChkaXIsIHRvTmVpZ2hib3IpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbG9hdCB0aGV0YSA9IChmbG9hdClNYXRoLkFjb3MoZG90UHJvZHVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoZXRhIDwgRmxvY2tBbmdsZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmVhcmJ5LkFkZChhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBOdW1OZWlnaGJvcnMgPSBuZWFyYnkuQ291bnQ7XHJcbiAgICAgICAgICAgIHJldHVybiBuZWFyYnk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB2b2lkIEZsaXQoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIC8vUE9yaWVudGF0aW9uID0gTWF0aEhlbHBlci5XcmFwQW5nbGUoUE9yaWVudGF0aW9uKTtcclxuICAgICAgICAgICAgUGVybGluQmVhdCA9IE1hdGhIZWxwZXIuQ2xhbXAoUGVybGluQmVhdCArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTAuMDVmLCAwLjA1ZiksIC0xZiwgMWYpO1xyXG4gICAgICAgICAgICBmbG9hdCBwZXJsaW5SID0gKE5vaXNlLkdldE5vaXNlKEN1cnJlbnRUaW1lICogMTAwLCAwLCAwKSkgKiBEZWx0YVRpbWUgKiBQZXJsaW5CZWF0O1xyXG4gICAgICAgICAgICBQVGhldGEgPSBNYXRoSGVscGVyLldyYXBBbmdsZShQVGhldGEgKyBwZXJsaW5SKTtcclxuICAgICAgICAgICAgUE9yaWVudGF0aW9uICs9IHBlcmxpblI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFZlY3RvcjIgRmxvY2soTGlzdDxBZ2VudD4gTmVpZ2hib3JzKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKE5laWdoYm9ycy5Db3VudCA9PSAwKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBzdGVlciA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBhbGlnbm1lbnQgPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgIFZlY3RvcjIgc2VwYXJhdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBjb2hlc2lvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBjdiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgZm9yZWFjaChBZ2VudCBhIGluIE5laWdoYm9ycylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgZGlzdFNxID0gVmVjdG9yMi5EaXN0YW5jZVNxdWFyZWQoUG9zaXRpb24sIGEuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgdCA9IEZsb2NrVG9vbHMuTWFwKGRpc3RTcSwgMCwgRmxvY2tEaXN0YW5jZVNxYXJlZCwgMSwgMCk7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIGRpciA9IFZlY3RvcjIuTXVsdGlwbHkoYS5WZWxvY2l0eSwgdCk7XHJcbiAgICAgICAgICAgICAgICBpZihhLklzUm9ndWUpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlZXIgKz0gU2VlayhhLlBvc2l0aW9uICsgYS5WZWxvY2l0eSAqIDEwKSAqIENvaGVzaW9uV2VpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVlcjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGFsaWdubWVudCArPSBkaXI7XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHNlcCA9IFZlY3RvcjIuU3VidHJhY3QoUG9zaXRpb24sIGEuUG9zaXRpb24pO1xyXG4gICAgICAgICAgICAgICAgZmxvYXQgciA9IHNlcC5MZW5ndGhTcXVhcmVkKCk7XHJcbiAgICAgICAgICAgICAgICBzZXAuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzZXAgKj0gMS4wZiAvIHI7XHJcbiAgICAgICAgICAgICAgICBzZXBhcmF0aW9uICs9IHNlcDtcclxuICAgICAgICAgICAgICAgIGN2ICs9IGEuUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYWxpZ25tZW50IC89IE5laWdoYm9ycy5Db3VudDtcclxuICAgICAgICAgICAgYWxpZ25tZW50Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBhbGlnbm1lbnQgKiBBbGlnbm1lbnRXZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBjdiAvPSBOZWlnaGJvcnMuQ291bnQ7XHJcbiAgICAgICAgICAgIGNvaGVzaW9uID0gU2Vlayhjdik7XHJcbiAgICAgICAgICAgIGNvaGVzaW9uLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBjb2hlc2lvbiAqIENvaGVzaW9uV2VpZ2h0O1xyXG5cclxuICAgICAgICAgICAgc2VwYXJhdGlvbi5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgc3RlZXIgKz0gc2VwYXJhdGlvbiAqIFNlcGFyYXRpb25XZWlnaHQ7XHJcbiAgICAgICAgICAgIHJldHVybiBzdGVlcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgRHJhd1Bvc2l0aW9uLCBUZXh0dXJlLkJvdW5kcywgQWdlbnRDb2xvciwgUE9yaWVudGF0aW9uICogTWF0aEhlbHBlci5Ud29QaSwgbmV3IFZlY3RvcjIoMC41ZiwgMC41ZiksIERyYXdTY2FsZSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xhc3MgUm9ndWVBZ2VudCA6IEFnZW50XHJcbiAgICB7XHJcbiAgICAgICAgY2xhc3MgUGFzdFBvc2l0aW9uXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBwdWJsaWMgQ29sb3IgQ29sb3IgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICAgICAgcHVibGljIFZlY3RvcjIgUG9zaXRpb24gPSBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZsb2F0IFdhbmRlclN0cmVuZ3RoID0gMTA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyQW1wID0gMTUwMDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyRGlzdGFuY2UgPSAxMDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyUmFkaXVzID0gMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJSYXRlID0gMC4wMWY7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyVGhldGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlckRlbHRhID0gMDtcclxuICAgICAgICBmbG9hdCBTZWVrU3RyZW5ndGggPSAyO1xyXG4gICAgICAgIGZsb2F0IERpbGF0aW9uRGlzdGFuY2UgPSAxNTA7XHJcbiAgICAgICAgZmxvYXQgRGlsYXRpb25EaXN0YW5jZVNxdWFyZWQgPSAwO1xyXG4gICAgICAgIExpc3Q8UGFzdFBvc2l0aW9uPiBQYXN0ID0gbmV3IExpc3Q8UGFzdFBvc2l0aW9uPigpO1xyXG4gICAgICAgIFZlY3RvcjIgVGFyZ2V0ID0gbmV3IFZlY3RvcjIoMjAwLCAyMDApO1xyXG4gICAgICAgIHB1YmxpYyBWZWN0b3IyIEZsb3dGb3JjZSA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBHYW1lT2JqZWN0IFRhcmdldE9iamVjdCA9IG51bGw7XHJcbiAgICAgICAgcHVibGljIGJvb2wgSXNTZWVraW5nID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIFJvZ3VlQWdlbnQoVGV4dHVyZTJEIGluVGV4dHVyZSkgOiBiYXNlKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzUm9ndWUgPSB0cnVlO1xyXG4gICAgICAgICAgICBNYXhGb3JjZSA9IDE1ZjtcclxuICAgICAgICAgICAgTWF4U3BlZWQgPSAyNTAuMGY7XHJcbiAgICAgICAgICAgIE1heEZvcmNlU3FhcmVkID0gTWF4Rm9yY2UgKiBNYXhGb3JjZTtcclxuICAgICAgICAgICAgTWF4U3BlZWRTcXVhcmVkID0gTWF4U3BlZWQgKiBNYXhTcGVlZDtcclxuICAgICAgICAgICAgRGlsYXRpb25EaXN0YW5jZVNxdWFyZWQgPSBEaWxhdGlvbkRpc3RhbmNlICogRGlsYXRpb25EaXN0YW5jZTtcclxuICAgICAgICAgICAgV2FuZGVyUmFkaXVzID0gV2FuZGVyRGlzdGFuY2UgKiAxLjI1ZjtcclxuICAgICAgICAgICAgVGV4dHVyZSA9IGluVGV4dHVyZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllciwgTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IEZsb3dGb3JjZTtcclxuICAgICAgICAgICAgUm9ndWVTZWVrKCk7XHJcbiAgICAgICAgICAgIFdhbmRlcihDdXJyZW50VGltZSwgRGVsdGFUaW1lKTtcclxuICAgICAgICAgICAgQ3JlYXRlSGlzdG9yeSgpO1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIsIEFnZW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgUm9ndWVTZWVrKClcclxuICAgICAgICB7ICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGlmKElzU2Vla2luZylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVGFyZ2V0ID0gVGFyZ2V0T2JqZWN0ICE9IG51bGwgPyBUYXJnZXRPYmplY3QuUG9zaXRpb24gOiBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgICAgICAgICBWZWN0b3IyIHNlZWtWZWN0b3IgPSBTZWVrKFRhcmdldCk7XHJcbiAgICAgICAgICAgICAgICBzZWVrVmVjdG9yLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgc2Vla1ZlY3RvciAqPSBTZWVrU3RyZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gc2Vla1ZlY3RvcjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcHJpdmF0ZSB2b2lkIENyZWF0ZUhpc3RvcnkoKVxyXG4gICAgICAgIHsgICAgXHJcbiAgICAgICAgICAgIGZvciAoaW50IGkgPSBQYXN0LkNvdW50IC0gMTsgaSA+PSAwOyBpLS0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFBhc3RbaV0uQ29sb3IuQSAtPSAxMDtcclxuICAgICAgICAgICAgICAgIGlmIChQYXN0W2ldLkNvbG9yLkEgPCAxMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBQYXN0LlJlbW92ZUF0KGkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChQYXN0LkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaW50IGluZGV4ID0gRmxvY2tUb29scy5HZXRSYW5kb21JbnRlZ2VyKFBhc3QuQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgQ29sb3IgUGlja2VkQ29sb3IgPSBGbG9ja1Rvb2xzLlBpY2s8Q29sb3I+KGdsb2JhbDo6QnJpZGdlLlNjcmlwdC5DYWxsRm9yKG5ldyBMaXN0PENvbG9yPigpLChfbzEpPT57X28xLkFkZChDb2xvci5MYXduR3JlZW4pO19vMS5BZGQoQ29sb3IuVHVycXVvaXNlKTtfbzEuQWRkKENvbG9yLk9yYW5nZVJlZCk7X28xLkFkZChDb2xvci5MaWdodFllbGxvdyk7X28xLkFkZChDb2xvci5XaGl0ZSk7X28xLkFkZChDb2xvci5GbG9yYWxXaGl0ZSk7cmV0dXJuIF9vMTt9KSkgKiAwLjVmO1xyXG4gICAgICAgICAgICAgICAgUGlja2VkQ29sb3IuQSA9IFBhc3RbaW5kZXhdLkNvbG9yLkE7XHJcbiAgICAgICAgICAgICAgICBQYXN0W2luZGV4XS5Db2xvciA9IFBpY2tlZENvbG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFBhc3QuQWRkKG5ldyBQYXN0UG9zaXRpb24oKSB7IFBvc2l0aW9uID0gUG9zaXRpb24gKyBGbG9ja1Rvb2xzLkdldFJhbmRvbVZlY3RvcjIoLTIsIDIsIC0yLCAyKSwgQ29sb3IgPSBDb2xvci5XaGl0ZSB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgV2FuZGVyKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZvcndhcmRfdGFyZ2V0ID0gbmV3IFZlY3RvcjIoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSwgKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSk7XHJcbiAgICAgICAgICAgIGZvcndhcmRfdGFyZ2V0ICo9IFdhbmRlckRpc3RhbmNlO1xyXG5cclxuICAgICAgICAgICAgV2FuZGVyRGVsdGEgPSBNYXRoSGVscGVyLkNsYW1wKFdhbmRlckRlbHRhICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgtMSwgMSksIC0xMCwgMTApO1xyXG4gICAgICAgICAgICBmbG9hdCB2YWx1ZSA9IE5vaXNlLkdldE5vaXNlKEN1cnJlbnRUaW1lICogV2FuZGVyRGVsdGEgKiBXYW5kZXJSYXRlLCAwLCAwKSAqIFdhbmRlckFtcDtcclxuICAgICAgICAgICAgV2FuZGVyVGhldGEgKz0gTWF0aEhlbHBlci5XcmFwQW5nbGUoV2FuZGVyVGhldGEgKyB2YWx1ZSAqIERlbHRhVGltZSk7XHJcblxyXG4gICAgICAgICAgICBmbG9hdCB4ID0gV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguQ29zKFdhbmRlclRoZXRhKSAtIFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLlNpbihXYW5kZXJUaGV0YSk7XHJcbiAgICAgICAgICAgIGZsb2F0IHkgPSBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5Db3MoV2FuZGVyVGhldGEpICsgV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguU2luKFdhbmRlclRoZXRhKTtcclxuXHJcbiAgICAgICAgICAgIFZlY3RvcjIgd2FuZGVyX3RhcmdldCA9IG5ldyBWZWN0b3IyKGZvcndhcmRfdGFyZ2V0LlggKyB4LCBmb3J3YXJkX3RhcmdldC5ZICsgeSk7XHJcbiAgICAgICAgICAgIHdhbmRlcl90YXJnZXQuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSB3YW5kZXJfdGFyZ2V0ICogV2FuZGVyU3RyZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3JlYWNoKFBhc3RQb3NpdGlvbiBwIGluIFBhc3QpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgcC5Qb3NpdGlvbiwgVGV4dHVyZS5Cb3VuZHMsIHAuQ29sb3IsIDAsIG5ldyBWZWN0b3IyKDAuNWYsIDAuNWYpLCBEcmF3U2NhbGUsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrLkdyYXBoaWNzO1xyXG51c2luZyBTeXN0ZW07XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57XHJcbiAgICBwdWJsaWMgY2xhc3MgTW9vbiA6IEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICByZWFkb25seSBmbG9hdCBTcGVlZCA9IDAuMDAwMDVmO1xyXG4gICAgICAgIHJlYWRvbmx5IFZlY3RvcjIgQW5jaG9yUG9zaXRpb24gPSBuZXcgVmVjdG9yMigxMjAwLCA1MjAwKTtcclxuICAgICAgICBmbG9hdCBPcmllbnRhdGlvbiA9IDAuMGY7ICAgICAgICBcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIFRleHR1cmU7XHJcblxyXG4gICAgICAgIHB1YmxpYyBNb29uKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE9yaWVudGF0aW9uID0gKGZsb2F0KU1hdGguUEkgKiAxLjkzZjtcclxuICAgICAgICAgICAgUG9zaXRpb24gPSBuZXcgVmVjdG9yMihBbmNob3JQb3NpdGlvbi5YICsgKChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyA1MTAwKihmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpLCBBbmNob3JQb3NpdGlvbi5ZICsgKC01MTAwKihmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFVwZGF0ZShmbG9hdCBEZWx0YVRpbWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEFuY2hvclBvc2l0aW9uLlggKyAoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIDUxMDAgKiAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSwgQW5jaG9yUG9zaXRpb24uWSArICgtNTEwMCAqIChmbG9hdClNYXRoLkNvcyhPcmllbnRhdGlvbikgKyAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKSk7XHJcbiAgICAgICAgICAgIE9yaWVudGF0aW9uID0gTWF0aEhlbHBlci5XcmFwQW5nbGUoT3JpZW50YXRpb24gKyBEZWx0YVRpbWUgKiBTcGVlZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbnRlcm5hbCB2b2lkIERyYXcoU3ByaXRlQmF0Y2ggU0IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBTQi5EcmF3KFRleHR1cmUsIFBvc2l0aW9uLCBUZXh0dXJlLkJvdW5kcywgQ29sb3IuV2hpdGUsIDAsIG5ldyBWZWN0b3IyKDAuNWYsIDAuNWYpLCAxLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iXQp9Cg==
