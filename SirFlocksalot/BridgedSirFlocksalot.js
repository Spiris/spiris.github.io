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
                        for (var i1 = 0; i1 < SirFlocksalot.Flock.NumRogue; i1 = (i1 + 1) | 0) {
                            this.Agents.getItem(i1).DrawScale = 5.0;
                            this.Agents.getItem(i1).Texture = this.OnePixelTexture;
                        }
                    }
                } else {
                    for (var i2 = 0; i2 < SirFlocksalot.Flock.NumFlock; i2 = (i2 + 1) | 0) {
                        this.Agents.getItem(i2).AgentColor = Microsoft.Xna.Framework.Color.White.$clone();
                        this.Agents.getItem(i2).DrawScale = 1.0;
                        this.Agents.getItem(i2).Texture = SirFlocksalot.FlockTools.Pick(Microsoft.Xna.Framework.Graphics.Texture2D, this.PetalTextures);
                    }
                    for (var i3 = 0; i3 < SirFlocksalot.Flock.NumRogue; i3 = (i3 + 1) | 0) {
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

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICJCcmlkZ2VkU2lyRmxvY2tzYWxvdC5qcyIsCiAgInNvdXJjZVJvb3QiOiAiIiwKICAic291cmNlcyI6IFsiQXBwLmNzIiwiR2FtZS9TaXJGbG9ja3NhbG90R2FtZS5jcyIsIkdhbWUvRmxvY2suY3MiLCJHYW1lL0Zsb2NrVG9vbHMuY3MiLCJHYW1lL0Zsb2NrQWdlbnQuY3MiLCJHYW1lL01vb24uY3MiXSwKICAibmFtZXMiOiBbIiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7WUFVWUEsYUFBYUE7WUFDYkEsZUFBZUEsQ0FBTUE7WUFDckJBLGdCQUFnQkEsQ0FBTUE7WUFDdEJBO1lBQ0FBLDBCQUFxRUE7O1lBRXJFQSxnQ0FBT0EsSUFBSUE7WUFDWEE7Ozs7Ozs7Ozs7Ozs7Ozs7Z0NDUnNCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ0dNQTs2QkFDR0E7Ozs7OzhCQUhkQSxLQUFJQTtxQ0FDY0EsS0FBSUE7Ozs7Ozs7OztnQkFPdkNBLHlCQUFvQkEsQ0FBQ0E7Z0JBQ3JCQSxJQUFJQTtvQkFFQUEsSUFBSUEsd0JBQW1CQTt3QkFFbkJBLEtBQUtBLFdBQVdBLElBQUlBLDhCQUFVQTs0QkFFMUJBLG9CQUFPQSxnQkFBZ0JBLElBQUlBOzRCQUMzQkEsb0JBQU9BOzRCQUNQQSxvQkFBT0EsYUFBYUE7O3dCQUV4QkEsS0FBS0EsWUFBV0EsS0FBSUEsOEJBQVVBOzRCQUUxQkEsb0JBQU9BOzRCQUNQQSxvQkFBT0EsY0FBYUE7Ozs7b0JBTTVCQSxLQUFLQSxZQUFXQSxLQUFJQSw4QkFBVUE7d0JBRTFCQSxvQkFBT0EsaUJBQWdCQTt3QkFDdkJBLG9CQUFPQTt3QkFDUEEsb0JBQU9BLGNBQWFBLDBFQUEyQkE7O29CQUVuREEsS0FBS0EsWUFBV0EsS0FBSUEsOEJBQVVBO3dCQUUxQkEsb0JBQU9BO3dCQUNQQSxvQkFBT0EsY0FBYUE7Ozs7O2dCQU01QkE7Z0JBQ0FBO2dCQUNBQTtnQkFDQUEsSUFBSUE7b0JBRUFBLEtBQUtBLFdBQVdBLElBQUlBLDhC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QWVBLEFBQU9BLFNBQVNBO2dCQUN2RkEsUUFBVUEsb0JBQWVBLEFBQU9BLFNBQVNBLG9CQUFlQSxvQkFBZUEsQUFBT0EsU0FBU0E7O2dCQUV2RkEsb0JBQXdCQSxJQUFJQSx1Q0FBUUEsbUJBQW1CQSxHQUFHQSxtQkFBbUJBO2dCQUM3RUE7Z0JBQ0FBLDRGQUFnQkEsc0VBQWdCQTs7NEJBRVZBOztnQkFFdEJBLDBCQUEwQkE7Ozs7d0JBRXRCQSxVQUFRQSxjQUFTQSxxQkFBWUEsOEJBQWdCQSxxQkFBWUEsSUFBSUEsa0RBQXFCQSxnQkFBV0EiLAogICJzb3VyY2VzQ29udGVudCI6IFsidXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcms7XHJcbnVzaW5nIFNpckZsb2Nrc2Fsb3Q7XHJcblxyXG5uYW1lc3BhY2UgQnJpZGdlZFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEFwcFxyXG4gICAge1xyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIEdhbWUgZ2FtZTtcclxuICAgICAgICBwdWJsaWMgc3RhdGljIHZvaWQgTWFpbigpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgY2FudmFzID0gbmV3IFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50KCk7XHJcbiAgICAgICAgICAgIGNhbnZhcy53aWR0aCA9ICh1aW50KVNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuWDtcclxuICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9ICh1aW50KVNpckZsb2Nrc2Fsb3RHYW1lLlNjcmVlblNpemUuWTtcclxuICAgICAgICAgICAgY2FudmFzLmlkID0gXCJtb25vZ2FtZWNhbnZhc1wiO1xyXG4gICAgICAgICAgICBSZXR5cGVkLmRvbS5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkPFJldHlwZWQuZG9tLkhUTUxDYW52YXNFbGVtZW50PihjYW52YXMpO1xyXG5cclxuICAgICAgICAgICAgZ2FtZSA9IG5ldyBTaXJGbG9ja3NhbG90R2FtZSgpO1xyXG4gICAgICAgICAgICBnYW1lLlJ1bigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yay5HcmFwaGljcztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuSW5wdXQ7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEdhbWVPYmplY3RcclxuICAgIHtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwdWJsaWMgR2FtZU9iamVjdCgpIHsgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGNsYXNzIFNpckZsb2Nrc2Fsb3RHYW1lIDogR2FtZVxyXG4gICAge1xyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgUG9pbnQgU2NyZWVuU2l6ZSA9IG5ldyBQb2ludCgxMjgwLCA3MjApO1xyXG4gICAgICAgIEdyYXBoaWNzRGV2aWNlTWFuYWdlciBncmFwaGljcztcclxuICAgICAgICBTcHJpdGVCYXRjaCBzcHJpdGVCYXRjaDtcclxuICAgICAgICAvL1Nwcml0ZUZvbnQgRGVidWdGb250O1xyXG4gICAgICAgIFRleHR1cmUyRCBCYWNrZ3JvdW5kVGV4dHVyZTtcclxuICAgICAgICBNb29uIE1vb247XHJcbiAgICAgICAgRmxvY2sgRmxvY2s7XHJcbiAgICAgICAgZmxvYXQgVGltZU1vZGlmaWVyID0gMS4wZjtcclxuICAgICAgICBwdWJsaWMgU2lyRmxvY2tzYWxvdEdhbWUoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNNb3VzZVZpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICBncmFwaGljcyA9IG5ldyBHcmFwaGljc0RldmljZU1hbmFnZXIodGhpcyk7XHJcbiAgICAgICAgICAgIGdyYXBoaWNzLlByZWZlcnJlZEJhY2tCdWZmZXJXaWR0aCA9IFNjcmVlblNpemUuWDtcclxuICAgICAgICAgICAgZ3JhcGhpY3MuUHJlZmVycmVkQmFja0J1ZmZlckhlaWdodCA9IFNjcmVlblNpemUuWTtcclxuICAgICAgICAgICAgLy9Jc0ZpeGVkVGltZVN0ZXAgPSBncmFwaGljcy5TeW5jaHJvbml6ZVdpdGhWZXJ0aWNhbFJldHJhY2UgPSBmYWxzZTtcclxuICAgICAgICAgICAgQ29udGVudC5Sb290RGlyZWN0b3J5ID0gXCJDb250ZW50XCI7XHJcbiAgICAgICAgICAgIE1vb24gPSBuZXcgTW9vbigpO1xyXG4gICAgICAgICAgICBGbG9jayA9IG5ldyBGbG9jaygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBJbml0aWFsaXplKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGJhc2UuSW5pdGlhbGl6ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm90ZWN0ZWQgb3ZlcnJpZGUgdm9pZCBMb2FkQ29udGVudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzcHJpdGVCYXRjaCA9IG5ldyBTcHJpdGVCYXRjaChHcmFwaGljc0RldmljZSk7XHJcbiAgICAgICAgICAgIC8vRGVidWdGb250ID0gQ29udGVudC5Mb2FkPFNwcml0ZUZvbnQ+KFwiRm9udHMvRGVidWdcIik7XHJcbiAgICAgICAgICAgIE1vb24uVGV4dHVyZSA9IENvbnRlbnQuTG9hZDxUZXh0dXJlMkQ+KFwibW9vblwiKTtcclxuICAgICAgICAgICAgQmFja2dyb3VuZFRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInN0YXJzXCIpO1xyXG4gICAgICAgICAgICBGbG9jay5PbmVQaXhlbFRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcIm9uZXB4XCIpO1xyXG4gICAgICAgICAgICBGbG9jay5QZXRhbFRleHR1cmVzLkFkZChDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInBldGFsXCIpKTtcclxuICAgICAgICAgICAgRmxvY2suUGV0YWxUZXh0dXJlcy5BZGQoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJwZXRhbC1ibHVlXCIpKTtcclxuICAgICAgICAgICAgRmxvY2suUGV0YWxUZXh0dXJlcy5BZGQoQ29udGVudC5Mb2FkPFRleHR1cmUyRD4oXCJwZXRhbC15ZWxsb3dcIikpO1xyXG4gICAgICAgICAgICBGbG9jay5Sb2d1ZVRleHR1cmUgPSBDb250ZW50LkxvYWQ8VGV4dHVyZTJEPihcInJvZ3VlXCIpO1xyXG4gICAgICAgICAgICAvLyBQb3N0IENvbnRlbnQgTG9hZGluZ1xyXG5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIEZsb2NrLlJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3RlY3RlZCBvdmVycmlkZSB2b2lkIFVubG9hZENvbnRlbnQoKVxyXG4gICAgICAgIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgRGljdGlvbmFyeTxLZXlzLCBib29sPiBEb3duS2V5cyA9IG5ldyBEaWN0aW9uYXJ5PEtleXMsIGJvb2w+KCk7XHJcbiAgICAgICAgYm9vbCBXYXNLZXlEb3duKEtleXMgS2V5VG9DaGVjaylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBEb3duS2V5cy5Db250YWluc0tleShLZXlUb0NoZWNrKSAmJiBEb3duS2V5c1tLZXlUb0NoZWNrXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdm9pZCBNYXJrS2V5c0Rvd24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yZWFjaCAoS2V5VmFsdWVQYWlyPEtleXMsIGJvb2w+IHBhaXIgaW4gRG93bktleXMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIERvd25LZXlzW3BhaXIuS2V5XSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEtleXMga2V5IGluIEtleWJvYXJkLkdldFN0YXRlKCkuR2V0UHJlc3NlZEtleXMoKSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYgKERvd25LZXlzLkNvbnRhaW5zS2V5KGtleSkpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRG93bktleXNba2V5XSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgRG93bktleXMuQWRkKGtleSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgVXBkYXRlKEdhbWVUaW1lIGdhbWVUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoV2FzS2V5RG93bihLZXlzLlNwYWNlKSAmJiBLZXlib2FyZC5HZXRTdGF0ZSgpLklzS2V5VXAoS2V5cy5TcGFjZSkpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIEZsb2NrLkNoYW5nZVRleHR1cmVzKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgTWFya0tleXNEb3duKCk7XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICBmbG9hdCBEZWx0YVRpbWUgPSAoZmxvYXQpZ2FtZVRpbWUuRWxhcHNlZEdhbWVUaW1lLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgZmxvYXQgQ3VycmVudFRpbWUgPSAoZmxvYXQpZ2FtZVRpbWUuVG90YWxHYW1lVGltZS5Ub3RhbFNlY29uZHM7XHJcbiAgICAgICAgICAgIE1vb24uVXBkYXRlKERlbHRhVGltZSk7XHJcbiAgICAgICAgICAgIEZsb2NrLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIpO1xyXG4gICAgICAgICAgICBiYXNlLlVwZGF0ZShnYW1lVGltZSk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcHJvdGVjdGVkIG92ZXJyaWRlIHZvaWQgRHJhdyhHYW1lVGltZSBnYW1lVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IGZyYW1lUmF0ZSA9IDEgLyAoZmxvYXQpZ2FtZVRpbWUuRWxhcHNlZEdhbWVUaW1lLlRvdGFsU2Vjb25kcztcclxuICAgICAgICAgICAgR3JhcGhpY3NEZXZpY2UuQ2xlYXIobmV3IENvbG9yKDApKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guQmVnaW4oU3ByaXRlU29ydE1vZGUuRGVmZXJyZWQsIEJsZW5kU3RhdGUuTm9uUHJlbXVsdGlwbGllZCk7XHJcbiAgICAgICAgICAgIHNwcml0ZUJhdGNoLkRyYXcoQmFja2dyb3VuZFRleHR1cmUsIG5ldyBSZWN0YW5nbGUoMCwgMCwgU2NyZWVuU2l6ZS5YLCBTY3JlZW5TaXplLlkpLCBDb2xvci5XaGl0ZSk7XHJcbiAgICAgICAgICAgIE1vb24uRHJhdyhzcHJpdGVCYXRjaCk7XHJcbiAgICAgICAgICAgIEZsb2NrLkRyYXcoc3ByaXRlQmF0Y2gpO1xyXG4gICAgICAgICAgICAvL3Nwcml0ZUJhdGNoLkRyYXdTdHJpbmcoRGVidWdGb250LCBzdHJpbmcuRm9ybWF0KFwiezB9IChGUFMpXCIsIGZyYW1lUmF0ZSksIG5ldyBWZWN0b3IyKDEwLCAxMCksIENvbG9yLldoaXRlKTtcclxuICAgICAgICAgICAgc3ByaXRlQmF0Y2guRW5kKCk7XHJcblxyXG4gICAgICAgICAgICBiYXNlLkRyYXcoZ2FtZVRpbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgcHVibGljIGNsYXNzIEZsb2NrXHJcbiAgICB7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBpbnQgTnVtRmxvY2sgPSA0NztcclxuICAgICAgICBzdGF0aWMgcHVibGljIGludCBOdW1Sb2d1ZSA9IDM7XHJcbiAgICAgICAgTGlzdDxBZ2VudD4gQWdlbnRzID0gbmV3IExpc3Q8QWdlbnQ+KCk7XHJcbiAgICAgICAgcHVibGljIExpc3Q8VGV4dHVyZTJEPiBQZXRhbFRleHR1cmVzID0gbmV3IExpc3Q8VGV4dHVyZTJEPigpO1xyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgUm9ndWVUZXh0dXJlID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIE9uZVBpeGVsVGV4dHVyZSA9IG51bGw7XHJcbiAgICAgICAgYm9vbCBJc0RyYXdpbmdGb3JEZWJ1ZyA9IGZhbHNlO1xyXG4gICAgICAgIHB1YmxpYyBGbG9jaygpIHsgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIENoYW5nZVRleHR1cmVzKClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIElzRHJhd2luZ0ZvckRlYnVnID0gIUlzRHJhd2luZ0ZvckRlYnVnO1xyXG4gICAgICAgICAgICBpZiAoSXNEcmF3aW5nRm9yRGVidWcpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmIChPbmVQaXhlbFRleHR1cmUgIT0gbnVsbClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IE51bUZsb2NrOyBpKyspXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uQWdlbnRDb2xvciA9IG5ldyBDb2xvcigyNTUsIDI1NSwgMjU1LCA1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5EcmF3U2NhbGUgPSAxNi4wZjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLlRleHR1cmUgPSBPbmVQaXhlbFRleHR1cmU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgTnVtUm9ndWU7IGkrKylcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5EcmF3U2NhbGUgPSA1LjBmO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uVGV4dHVyZSA9IE9uZVBpeGVsVGV4dHVyZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IE51bUZsb2NrOyBpKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgQWdlbnRzW2ldLkFnZW50Q29sb3IgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uRHJhd1NjYWxlID0gMS4wZjtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHNbaV0uVGV4dHVyZSA9IEZsb2NrVG9vbHMuUGljazxUZXh0dXJlMkQ+KFBldGFsVGV4dHVyZXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1Sb2d1ZTsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5EcmF3U2NhbGUgPSAxLjBmO1xyXG4gICAgICAgICAgICAgICAgICAgIEFnZW50c1tpXS5UZXh0dXJlID0gUm9ndWVUZXh0dXJlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIFJlc2V0KClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIE51bUZsb2NrID0gNDc7XHJcbiAgICAgICAgICAgIE51bVJvZ3VlID0gMztcclxuICAgICAgICAgICAgQWdlbnRzLkNsZWFyKCk7XHJcbiAgICAgICAgICAgIGlmIChQZXRhbFRleHR1cmVzLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCBOdW1GbG9jazsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEFnZW50cy5BZGQobmV3IEZsb2NrQWdlbnQoRmxvY2tUb29scy5QaWNrPFRleHR1cmUyRD4oUGV0YWxUZXh0dXJlcykpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoUm9ndWVUZXh0dXJlICE9IG51bGwpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGZvciAoaW50IGkgPSAwOyBpIDwgTnVtUm9ndWU7IGkrKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBBZ2VudHMuQWRkKG5ldyBSb2d1ZUFnZW50KFJvZ3VlVGV4dHVyZSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZEZsb2NrQWdlbnRzKGludCBudW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobnVtID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxGbG9ja0FnZW50PiBGbG9ja0FnZW50cyA9IG5ldyBMaXN0PEZsb2NrQWdlbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG51bTsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIEZsb2NrQWdlbnRzLkFkZChuZXcgRmxvY2tBZ2VudChGbG9ja1Rvb2xzLlBpY2s8VGV4dHVyZTJEPihQZXRhbFRleHR1cmVzKSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgQWdlbnRzLkluc2VydFJhbmdlKE51bUZsb2NrLCBGbG9ja0FnZW50cyk7XHJcbiAgICAgICAgICAgICAgICBOdW1GbG9jayArPSBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1YmxpYyB2b2lkIEFkZFJvZ3VlQWdlbnRzKGludCBudW0pXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAobnVtID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgTGlzdDxSb2d1ZUFnZW50PiBSb2d1ZUFnZW50cyA9IG5ldyBMaXN0PFJvZ3VlQWdlbnQ+KCk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGludCBpID0gMDsgaSA8IG51bTsgaSsrKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFJvZ3VlQWdlbnRzLkFkZChuZXcgUm9ndWVBZ2VudChSb2d1ZVRleHR1cmUpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIEFnZW50cy5BZGRSYW5nZShSb2d1ZUFnZW50cyk7XHJcbiAgICAgICAgICAgICAgICBOdW1Sb2d1ZSArPSBudW07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IEN1cnJlbnRUaW1lLCBmbG9hdCBEZWx0YVRpbWUsIGZsb2F0IFRpbWVNb2RpZmllcilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhLlVwZGF0ZShDdXJyZW50VGltZSwgRGVsdGFUaW1lLCBUaW1lTW9kaWZpZXIsIEFnZW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2ggKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBhLkRyYXcoU0IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsInVzaW5nIE1pY3Jvc29mdC5YbmEuRnJhbWV3b3JrO1xyXG51c2luZyBTeXN0ZW07XHJcbnVzaW5nIFN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljO1xyXG5cclxubmFtZXNwYWNlIFNpckZsb2Nrc2Fsb3Rcclxue1xyXG4gICAgc3RhdGljIGNsYXNzIEZsb2NrVG9vbHNcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgUmFuZG9tIFJhbmRvbWl6ZXIgPSBuZXcgUmFuZG9tKCk7XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBmbG9hdCBHZXRSYW5kb21GbG9hdChmbG9hdCBWYWx1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiAoZmxvYXQpUmFuZG9taXplci5OZXh0RG91YmxlKCkgKiBWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgc3RhdGljIHB1YmxpYyBmbG9hdCBHZXRSYW5kb21GbG9hdChmbG9hdCBNaW4sIGZsb2F0IE1heClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IEFic1RvdGFsID0gKGZsb2F0KU1hdGguQWJzKE1pbikgKyAoZmxvYXQpTWF0aC5BYnMoTWF4KTtcclxuICAgICAgICAgICAgcmV0dXJuIChmbG9hdClSYW5kb21pemVyLk5leHREb3VibGUoKSAqIEFic1RvdGFsICsgTWluO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IE1hcChmbG9hdCB2YWx1ZSwgZmxvYXQgZnJvbVNvdXJjZSwgZmxvYXQgdG9Tb3VyY2UsIGZsb2F0IGZyb21UYXJnZXQsIGZsb2F0IHRvVGFyZ2V0KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSAtIGZyb21Tb3VyY2UpIC8gKHRvU291cmNlIC0gZnJvbVNvdXJjZSkgKiAodG9UYXJnZXQgLSBmcm9tVGFyZ2V0KSArIGZyb21UYXJnZXQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBMaW1pdChyZWYgVmVjdG9yMiBWZWN0b3IsIGZsb2F0IExpbWl0U3F1YXJlZCwgZmxvYXQgTGltaXQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLkxlbmd0aFNxdWFyZWQoKSA+IExpbWl0U3F1YXJlZClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICAgICAgVmVjdG9yID0gVmVjdG9yICogTGltaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBmbG9hdCBIZWFkaW5nKHRoaXMgVmVjdG9yMiBWZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gKGZsb2F0KU1hdGguQXRhbjIoVmVjdG9yLlksIFZlY3Rvci5YKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHN0YXRpYyBWZWN0b3IyIEdldFNhZmVOb3JtYWwoVmVjdG9yMiBWZWN0b3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihWZWN0b3IuTGVuZ3RoU3F1YXJlZCgpID4gMC4wMWYpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBWZWN0b3IyLk5vcm1hbGl6ZShWZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBWZWN0b3IyLlplcm87XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgVCBQaWNrPFQ+KExpc3Q8VD4gT3B0aW9ucylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmIChPcHRpb25zLkNvdW50ID4gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9wdGlvbnNbUmFuZG9taXplci5OZXh0KE9wdGlvbnMuQ291bnQpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBzdGF0aWMgdm9pZCBXcmFwVmVjdG9yKHJlZiBWZWN0b3IyIFZlY3RvciwgVmVjdG9yMiBCb3VuZHMsIGZsb2F0IEVycm9yVG9sZXJhbmNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgUmlnaHQgPSBCb3VuZHMuWCArIEVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBmbG9hdCBMZWZ0ID0gLUVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLlggPiBSaWdodClcclxuICAgICAgICAgICAgICAgIFZlY3Rvci5YID0gTGVmdDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoVmVjdG9yLlggPCBMZWZ0KVxyXG4gICAgICAgICAgICAgICAgVmVjdG9yLlggPSBSaWdodDtcclxuICAgICAgICAgICAgZmxvYXQgVG9wID0gLUVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBmbG9hdCBCb3R0b20gPSBCb3VuZHMuWSArIEVycm9yVG9sZXJhbmNlO1xyXG4gICAgICAgICAgICBpZiAoVmVjdG9yLlkgPiBCb3R0b20pXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWSA9IFRvcDtcclxuICAgICAgICAgICAgZWxzZSBpZiAoVmVjdG9yLlkgPCBUb3ApXHJcbiAgICAgICAgICAgICAgICBWZWN0b3IuWSA9IEJvdHRvbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBpbnQgR2V0UmFuZG9tSW50ZWdlcihpbnQgTWF4VmFsdWUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gUmFuZG9taXplci5OZXh0KE1heFZhbHVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHN0YXRpYyBWZWN0b3IyIEdldFJhbmRvbVZlY3RvcjIoZmxvYXQgTWluWCwgZmxvYXQgTWF4WCwgZmxvYXQgTWluWSwgZmxvYXQgTWF4WSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmVjdG9yMihHZXRSYW5kb21GbG9hdChNaW5YLCBNYXhYKSwgR2V0UmFuZG9tRmxvYXQoTWluWSwgTWF4WSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzdGF0aWMgY2xhc3MgTm9pc2VcclxuICAgIHtcclxuICAgICAgICBzdGF0aWMgTm9pc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IDA7IGkgPCA1MTI7IGkrKylcclxuICAgICAgICAgICAgICAgIHBlcm1baV0gPSBwW2kgJiAyNTVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBzaW1wbGV4IG5vaXNlIGluIDJELCAzRCBhbmQgNERcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXVtdIGdyYWQzID0gbmV3IGludFtdW10ge1xyXG4gICAgICAgIG5ldyBpbnRbXSB7MSwxLDB9LCBuZXcgaW50W10gey0xLDEsMH0sIG5ldyBpbnRbXSB7MSwtMSwwfSwgbmV3IGludFtdIHstMSwtMSwwfSxcclxuICAgICAgICBuZXcgaW50W10gezEsMCwxfSwgbmV3IGludFtdIHstMSwwLDF9LCBuZXcgaW50W10gezEsMCwtMX0sIG5ldyBpbnRbXSB7LTEsMCwtMX0sXHJcbiAgICAgICAgbmV3IGludFtdIHswLDEsMX0sIG5ldyBpbnRbXSB7MCwtMSwxfSwgbmV3IGludFtdIHswLDEsLTF9LCBuZXcgaW50W10gezAsLTEsLTF9XHJcbiAgICB9O1xyXG5cclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnRbXSBwID0gezE1MSwxNjAsMTM3LDkxLDkwLDE1LFxyXG4gICAgICAgIDEzMSwxMywyMDEsOTUsOTYsNTMsMTk0LDIzMyw3LDIyNSwxNDAsMzYsMTAzLDMwLDY5LDE0Miw4LDk5LDM3LDI0MCwyMSwxMCwyMyxcclxuICAgICAgICAxOTAsIDYsMTQ4LDI0NywxMjAsMjM0LDc1LDAsMjYsMTk3LDYyLDk0LDI1MiwyMTksMjAzLDExNywzNSwxMSwzMiw1NywxNzcsMzMsXHJcbiAgICAgICAgODgsMjM3LDE0OSw1Niw4NywxNzQsMjAsMTI1LDEzNiwxNzEsMTY4LCA2OCwxNzUsNzQsMTY1LDcxLDEzNCwxMzksNDgsMjcsMTY2LFxyXG4gICAgICAgIDc3LDE0NiwxNTgsMjMxLDgzLDExMSwyMjksMTIyLDYwLDIxMSwxMzMsMjMwLDIyMCwxMDUsOTIsNDEsNTUsNDYsMjQ1LDQwLDI0NCxcclxuICAgICAgICAxMDIsMTQzLDU0LCA2NSwyNSw2MywxNjEsIDEsMjE2LDgwLDczLDIwOSw3NiwxMzIsMTg3LDIwOCwgODksMTgsMTY5LDIwMCwxOTYsXHJcbiAgICAgICAgMTM1LDEzMCwxMTYsMTg4LDE1OSw4NiwxNjQsMTAwLDEwOSwxOTgsMTczLDE4NiwgMyw2NCw1MiwyMTcsMjI2LDI1MCwxMjQsMTIzLFxyXG4gICAgICAgIDUsMjAyLDM4LDE0NywxMTgsMTI2LDI1NSw4Miw4NSwyMTIsMjA3LDIwNiw1OSwyMjcsNDcsMTYsNTgsMTcsMTgyLDE4OSwyOCw0MixcclxuICAgICAgICAyMjMsMTgzLDE3MCwyMTMsMTE5LDI0OCwxNTIsIDIsNDQsMTU0LDE2MywgNzAsMjIxLDE1MywxMDEsMTU1LDE2NywgNDMsMTcyLDksXHJcbiAgICAgICAgMTI5LDIyLDM5LDI1MywgMTksOTgsMTA4LDExMCw3OSwxMTMsMjI0LDIzMiwxNzgsMTg1LCAxMTIsMTA0LDIxOCwyNDYsOTcsMjI4LFxyXG4gICAgICAgIDI1MSwzNCwyNDIsMTkzLDIzOCwyMTAsMTQ0LDEyLDE5MSwxNzksMTYyLDI0MSwgODEsNTEsMTQ1LDIzNSwyNDksMTQsMjM5LDEwNyxcclxuICAgICAgICA0OSwxOTIsMjE0LCAzMSwxODEsMTk5LDEwNiwxNTcsMTg0LCA4NCwyMDQsMTc2LDExNSwxMjEsNTAsNDUsMTI3LCA0LDE1MCwyNTQsXHJcbiAgICAgICAgMTM4LDIzNiwyMDUsOTMsMjIyLDExNCw2NywyOSwyNCw3MiwyNDMsMTQxLDEyOCwxOTUsNzgsNjYsMjE1LDYxLDE1NiwxODB9O1xyXG4gICAgICAgIC8vIFRvIHJlbW92ZSB0aGUgbmVlZCBmb3IgaW5kZXggd3JhcHBpbmcsIGRvdWJsZSB0aGUgcGVybXV0YXRpb24gdGFibGUgbGVuZ3RoXHJcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgaW50W10gcGVybSA9IG5ldyBpbnRbNTEyXTtcclxuXHJcbiAgICAgICAgLy8gVGhpcyBtZXRob2QgaXMgYSAqbG90KiBmYXN0ZXIgdGhhbiB1c2luZyAoaW50KU1hdGguZmxvb3IoeClcclxuICAgICAgICBwcml2YXRlIHN0YXRpYyBpbnQgZmFzdGZsb29yKGRvdWJsZSB4KVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHggPiAwID8gKGludCl4IDogKGludCl4IC0gMTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgc3RhdGljIGRvdWJsZSBkb3QoaW50W10gZywgZG91YmxlIHgsIGRvdWJsZSB5LCBkb3VibGUgeilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiBnWzBdICogeCArIGdbMV0gKiB5ICsgZ1syXSAqIHo7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwdWJsaWMgc3RhdGljIGZsb2F0IEdldE5vaXNlKGRvdWJsZSBwWCwgZG91YmxlIHBZLCBkb3VibGUgcFopXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBkb3VibGUgbjAsIG4xLCBuMiwgbjM7IC8vIE5vaXNlIGNvbnRyaWJ1dGlvbnMgZnJvbSB0aGUgZm91ciBjb3JuZXJzXHJcbiAgICAgICAgICAgIC8vIFNrZXcgdGhlIGlucHV0IHNwYWNlIHRvIGRldGVybWluZSB3aGljaCBzaW1wbGV4IGNlbGwgd2UncmUgaW5cclxuICAgICAgICAgICAgZG91YmxlIEYzID0gMS4wIC8gMy4wO1xyXG4gICAgICAgICAgICBkb3VibGUgcyA9IChwWCArIHBZICsgcFopICogRjM7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHNrZXcgZmFjdG9yIGZvciAzRFxyXG4gICAgICAgICAgICBpbnQgaSA9IGZhc3RmbG9vcihwWCArIHMpO1xyXG4gICAgICAgICAgICBpbnQgaiA9IGZhc3RmbG9vcihwWSArIHMpO1xyXG4gICAgICAgICAgICBpbnQgayA9IGZhc3RmbG9vcihwWiArIHMpO1xyXG4gICAgICAgICAgICBkb3VibGUgRzMgPSAxLjAgLyA2LjA7IC8vIFZlcnkgbmljZSBhbmQgc2ltcGxlIHVuc2tldyBmYWN0b3IsIHRvb1xyXG4gICAgICAgICAgICBkb3VibGUgdCA9IChpICsgaiArIGspICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSBYMCA9IGkgLSB0OyAvLyBVbnNrZXcgdGhlIGNlbGwgb3JpZ2luIGJhY2sgdG8gKHgseSx6KSBzcGFjZVxyXG4gICAgICAgICAgICBkb3VibGUgWTAgPSBqIC0gdDtcclxuICAgICAgICAgICAgZG91YmxlIFowID0gayAtIHQ7XHJcbiAgICAgICAgICAgIGRvdWJsZSB4MCA9IHBYIC0gWDA7IC8vIFRoZSB4LHkseiBkaXN0YW5jZXMgZnJvbSB0aGUgY2VsbCBvcmlnaW5cclxuICAgICAgICAgICAgZG91YmxlIHkwID0gcFkgLSBZMDtcclxuICAgICAgICAgICAgZG91YmxlIHowID0gcFogLSBaMDtcclxuICAgICAgICAgICAgLy8gRm9yIHRoZSAzRCBjYXNlLCB0aGUgc2ltcGxleCBzaGFwZSBpcyBhIHNsaWdodGx5IGlycmVndWxhciB0ZXRyYWhlZHJvbi5cclxuICAgICAgICAgICAgLy8gRGV0ZXJtaW5lIHdoaWNoIHNpbXBsZXggd2UgYXJlIGluLlxyXG4gICAgICAgICAgICBpbnQgaTEsIGoxLCBrMTsgLy8gT2Zmc2V0cyBmb3Igc2Vjb25kIGNvcm5lciBvZiBzaW1wbGV4IGluIChpLGosaykgY29vcmRzXHJcbiAgICAgICAgICAgIGludCBpMiwgajIsIGsyOyAvLyBPZmZzZXRzIGZvciB0aGlyZCBjb3JuZXIgb2Ygc2ltcGxleCBpbiAoaSxqLGspIGNvb3Jkc1xyXG4gICAgICAgICAgICBpZiAoeDAgPj0geTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmICh5MCA+PSB6MClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGsxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBpMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgajIgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGsyID0gMDtcclxuICAgICAgICAgICAgICAgIH0gLy8gWCBZIFogb3JkZXJcclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHgwID49IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBYIFogWSBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBaIFggWSBvcmRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgeyAvLyB4MDx5MFxyXG4gICAgICAgICAgICAgICAgaWYgKHkwIDwgejApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaTEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBrMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgaTIgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGoyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBrMiA9IDE7XHJcbiAgICAgICAgICAgICAgICB9IC8vIFogWSBYIG9yZGVyXHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh4MCA8IHowKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAxO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBZIFogWCBvcmRlclxyXG4gICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGkxID0gMDtcclxuICAgICAgICAgICAgICAgICAgICBqMSA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazEgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIGkyID0gMTtcclxuICAgICAgICAgICAgICAgICAgICBqMiA9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAgazIgPSAwO1xyXG4gICAgICAgICAgICAgICAgfSAvLyBZIFggWiBvcmRlclxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIEEgc3RlcCBvZiAoMSwwLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgxLWMsLWMsLWMpIGluICh4LHkseiksXHJcbiAgICAgICAgICAgIC8vIGEgc3RlcCBvZiAoMCwxLDApIGluIChpLGosaykgbWVhbnMgYSBzdGVwIG9mICgtYywxLWMsLWMpIGluICh4LHkseiksIGFuZFxyXG4gICAgICAgICAgICAvLyBhIHN0ZXAgb2YgKDAsMCwxKSBpbiAoaSxqLGspIG1lYW5zIGEgc3RlcCBvZiAoLWMsLWMsMS1jKSBpbiAoeCx5LHopLCB3aGVyZVxyXG4gICAgICAgICAgICAvLyBjID0gMS82LlxyXG5cclxuICAgICAgICAgICAgZG91YmxlIHgxID0geDAgLSBpMSArIEczOyAvLyBPZmZzZXRzIGZvciBzZWNvbmQgY29ybmVyIGluICh4LHkseikgY29vcmRzXHJcbiAgICAgICAgICAgIGRvdWJsZSB5MSA9IHkwIC0gajEgKyBHMztcclxuICAgICAgICAgICAgZG91YmxlIHoxID0gejAgLSBrMSArIEczO1xyXG4gICAgICAgICAgICBkb3VibGUgeDIgPSB4MCAtIGkyICsgMi4wICogRzM7IC8vIE9mZnNldHMgZm9yIHRoaXJkIGNvcm5lciBpbiAoeCx5LHopIGNvb3Jkc1xyXG4gICAgICAgICAgICBkb3VibGUgeTIgPSB5MCAtIGoyICsgMi4wICogRzM7XHJcbiAgICAgICAgICAgIGRvdWJsZSB6MiA9IHowIC0gazIgKyAyLjAgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIHgzID0geDAgLSAxLjAgKyAzLjAgKiBHMzsgLy8gT2Zmc2V0cyBmb3IgbGFzdCBjb3JuZXIgaW4gKHgseSx6KSBjb29yZHNcclxuICAgICAgICAgICAgZG91YmxlIHkzID0geTAgLSAxLjAgKyAzLjAgKiBHMztcclxuICAgICAgICAgICAgZG91YmxlIHozID0gejAgLSAxLjAgKyAzLjAgKiBHMztcclxuICAgICAgICAgICAgLy8gV29yayBvdXQgdGhlIGhhc2hlZCBncmFkaWVudCBpbmRpY2VzIG9mIHRoZSBmb3VyIHNpbXBsZXggY29ybmVyc1xyXG4gICAgICAgICAgICBpbnQgaWkgPSBpICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQgamogPSBqICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQga2sgPSBrICYgMjU1O1xyXG4gICAgICAgICAgICBpbnQgZ2kwID0gcGVybVtpaSArIHBlcm1bamogKyBwZXJtW2trXV1dICUgMTI7XHJcbiAgICAgICAgICAgIGludCBnaTEgPSBwZXJtW2lpICsgaTEgKyBwZXJtW2pqICsgajEgKyBwZXJtW2trICsgazFdXV0gJSAxMjtcclxuICAgICAgICAgICAgaW50IGdpMiA9IHBlcm1baWkgKyBpMiArIHBlcm1bamogKyBqMiArIHBlcm1ba2sgKyBrMl1dXSAlIDEyO1xyXG4gICAgICAgICAgICBpbnQgZ2kzID0gcGVybVtpaSArIDEgKyBwZXJtW2pqICsgMSArIHBlcm1ba2sgKyAxXV1dICUgMTI7XHJcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY29udHJpYnV0aW9uIGZyb20gdGhlIGZvdXIgY29ybmVyc1xyXG4gICAgICAgICAgICBkb3VibGUgdDAgPSAwLjYgLSB4MCAqIHgwIC0geTAgKiB5MCAtIHowICogejA7XHJcbiAgICAgICAgICAgIGlmICh0MCA8IDApXHJcbiAgICAgICAgICAgICAgICBuMCA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MCAqPSB0MDtcclxuICAgICAgICAgICAgICAgIG4wID0gdDAgKiB0MCAqIGRvdChncmFkM1tnaTBdLCB4MCwgeTAsIHowKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDEgPSAwLjYgLSB4MSAqIHgxIC0geTEgKiB5MSAtIHoxICogejE7XHJcbiAgICAgICAgICAgIGlmICh0MSA8IDApXHJcbiAgICAgICAgICAgICAgICBuMSA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MSAqPSB0MTtcclxuICAgICAgICAgICAgICAgIG4xID0gdDEgKiB0MSAqIGRvdChncmFkM1tnaTFdLCB4MSwgeTEsIHoxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDIgPSAwLjYgLSB4MiAqIHgyIC0geTIgKiB5MiAtIHoyICogejI7XHJcbiAgICAgICAgICAgIGlmICh0MiA8IDApXHJcbiAgICAgICAgICAgICAgICBuMiA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MiAqPSB0MjtcclxuICAgICAgICAgICAgICAgIG4yID0gdDIgKiB0MiAqIGRvdChncmFkM1tnaTJdLCB4MiwgeTIsIHoyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkb3VibGUgdDMgPSAwLjYgLSB4MyAqIHgzIC0geTMgKiB5MyAtIHozICogejM7XHJcbiAgICAgICAgICAgIGlmICh0MyA8IDApXHJcbiAgICAgICAgICAgICAgICBuMyA9IDAuMDtcclxuICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB0MyAqPSB0MztcclxuICAgICAgICAgICAgICAgIG4zID0gdDMgKiB0MyAqIGRvdChncmFkM1tnaTNdLCB4MywgeTMsIHozKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBBZGQgY29udHJpYnV0aW9ucyBmcm9tIGVhY2ggY29ybmVyIHRvIGdldCB0aGUgZmluYWwgbm9pc2UgdmFsdWUuXHJcbiAgICAgICAgICAgIC8vIFRoZSByZXN1bHQgaXMgc2NhbGVkIHRvIHN0YXkganVzdCBpbnNpZGUgWy0xLCAxXSAtIG5vdyBbMCwgMV1cclxuICAgICAgICAgICAgcmV0dXJuICgzMi4wZiAqIChmbG9hdCkobjAgKyBuMSArIG4yICsgbjMpICsgMSkgKiAwLjVmO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxudXNpbmcgU3lzdGVtLkNvbGxlY3Rpb25zLkdlbmVyaWM7XHJcblxyXG5uYW1lc3BhY2UgU2lyRmxvY2tzYWxvdFxyXG57ICAgIFxyXG4gICAgcHVibGljIGNsYXNzIEFnZW50IDogR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHN0YXRpYyBpbnQgQ3VycmVudEFnZW50SWQgPSAwO1xyXG5cclxuICAgICAgICBwdWJsaWMgVGV4dHVyZTJEIFRleHR1cmU7XHJcbiAgICAgICAgcHVibGljIGludCBBZ2VudElkID0gMDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1JvZ3VlID0gZmFsc2U7XHJcbiAgICAgICAgcHVibGljIENvbG9yIEFnZW50Q29sb3IgPSBDb2xvci5XaGl0ZTtcclxuICAgICAgICBwdWJsaWMgZmxvYXQgRHJhd1NjYWxlID0gMS4wZjtcclxuICAgICAgICBwdWJsaWMgVmVjdG9yMiBWZWxvY2l0eSA9IFZlY3RvcjIuT25lO1xyXG4gICAgICAgIHByb3RlY3RlZCBWZWN0b3IyIEFjY2VsZXJhdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICBwcm90ZWN0ZWQgZmxvYXQgT3JpZW50YXRpb24gPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhGb3JjZSA9IDVmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhGb3JjZVNxYXJlZCA9IDAuMGY7XHJcbiAgICAgICAgcHJvdGVjdGVkIGZsb2F0IE1heFNwZWVkID0gMTAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhTcGVlZFNxdWFyZWQgPSAwLjBmO1xyXG4gICAgICAgIHByb3RlY3RlZCBmbG9hdCBNYXhUdXJuUmF0ZSA9IDAuNjI4MzE4NTQ4RjtcclxuXHJcblxyXG4gICAgICAgIHB1YmxpYyBBZ2VudCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBZ2VudElkID0gQ3VycmVudEFnZW50SWQrKztcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBNYXhTcGVlZFNxdWFyZWQgPSBNYXhTcGVlZCAqIE1heFNwZWVkO1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5YKSwgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdChTaXJGbG9ja3NhbG90R2FtZS5TY3JlZW5TaXplLlkpKTtcclxuICAgICAgICAgICAgZmxvYXQgUXVhcnRlclNwZWVkID0gTWF4U3BlZWQgKiAwLjI1ZjtcclxuICAgICAgICAgICAgVmVsb2NpdHkgPSBGbG9ja1Rvb2xzLkdldFJhbmRvbVZlY3RvcjIoLVF1YXJ0ZXJTcGVlZCwgUXVhcnRlclNwZWVkLCAtUXVhcnRlclNwZWVkLCBRdWFydGVyU3BlZWQpO1xyXG4gICAgICAgICAgICBPcmllbnRhdGlvbiA9IFZlbG9jaXR5LkhlYWRpbmcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZpcnR1YWwgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBGbG9ja1Rvb2xzLkxpbWl0KHJlZiBBY2NlbGVyYXRpb24sIE1heEZvcmNlU3FhcmVkLCBNYXhGb3JjZSk7XHJcbiAgICAgICAgICAgIFZlbG9jaXR5ICs9IEFjY2VsZXJhdGlvbjtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5MaW1pdChyZWYgVmVsb2NpdHksIE1heFNwZWVkU3F1YXJlZCwgTWF4U3BlZWQpO1xyXG4gICAgICAgICAgICBpZihWZWxvY2l0eS5MZW5ndGhTcXVhcmVkKCkgPiAxKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBPcmllbnRhdGlvbiA9IFZlbG9jaXR5LkhlYWRpbmcoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBQb3NpdGlvbiArPSBWZWxvY2l0eSAqIERlbHRhVGltZTtcclxuICAgICAgICAgICAgRmxvY2tUb29scy5XcmFwVmVjdG9yKHJlZiBQb3NpdGlvbiwgU2lyRmxvY2tzYWxvdEdhbWUuU2NyZWVuU2l6ZS5Ub1ZlY3RvcjIoKSwgMTAwKTtcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICo9IDAuOWY7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyB2aXJ0dWFsIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQikgeyB9XHJcbiAgICAgICAgcHJvdGVjdGVkIFZlY3RvcjIgU2VlayhWZWN0b3IyIFRhcmdldClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZGVzaXJlZFZlbG9jaXR5ID0gVmVjdG9yMi5TdWJ0cmFjdChUYXJnZXQsIFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgZGVzaXJlZFZlbG9jaXR5Lk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBmbG9hdCBkZXNpcmVkSGVhZGluZyA9IGRlc2lyZWRWZWxvY2l0eS5IZWFkaW5nKCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGhlYWRpbmdEaWZmID0gZGVzaXJlZEhlYWRpbmcgLSBPcmllbnRhdGlvbjtcclxuICAgICAgICAgICAgaWYoaGVhZGluZ0RpZmYgPiBNYXRoLlBJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGlmZiA9IC0oTWF0aEhlbHBlci5Ud29QaSAtIGhlYWRpbmdEaWZmKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmIChoZWFkaW5nRGlmZiA8IC1NYXRoLlBJKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBoZWFkaW5nRGlmZiA9IE1hdGhIZWxwZXIuVHdvUGkgLSAoZmxvYXQpTWF0aC5BYnMoaGVhZGluZ0RpZmYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsb2F0IHR1cm5EZWx0YSA9IE1hdGhIZWxwZXIuQ2xhbXAoaGVhZGluZ0RpZmYsIC1NYXhUdXJuUmF0ZSwgTWF4VHVyblJhdGUpO1xyXG4gICAgICAgICAgICBmbG9hdCBkZXNpcmUgPSBPcmllbnRhdGlvbiArIHR1cm5EZWx0YTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWZWN0b3IyKChmbG9hdClNYXRoLkNvcyhkZXNpcmUpICogTWF4U3BlZWQsIChmbG9hdClNYXRoLlNpbihkZXNpcmUpICogTWF4U3BlZWQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBGbG9ja0FnZW50IDogQWdlbnRcclxuICAgIHsgICAgICAgIFxyXG4gICAgICAgIGludCBOdW1OZWlnaGJvcnMgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrRGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrRGlzdGFuY2VTcWFyZWQgPSAwO1xyXG4gICAgICAgIGZsb2F0IEZsb2NrQW5nbGUgPSAwO1xyXG4gICAgICAgIGZsb2F0IENvaGVzaW9uV2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBTZXBhcmF0aW9uV2VpZ2h0ID0gMDtcclxuICAgICAgICBmbG9hdCBBbGlnbm1lbnRXZWlnaHQgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBlcmxpbkJlYXQgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBSYWRpdXMgPSA1MDtcclxuICAgICAgICBmbG9hdCBQVGhldGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFBPcmllbnRhdGlvbiA9IDA7XHJcbiAgICAgICAgZmxvYXQgQ29sb3JGYWxsb2ZmID0gMDtcclxuICAgICAgIFxyXG4gICAgICAgIFZlY3RvcjIgRHJhd1Bvc2l0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIHB1YmxpYyBGbG9ja0FnZW50KFRleHR1cmUyRCBBZ2VudFRleHR1cmUpIDogYmFzZSgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBUZXh0dXJlID0gQWdlbnRUZXh0dXJlO1xyXG4gICAgICAgICAgICBNYXhGb3JjZSA9IDEwO1xyXG4gICAgICAgICAgICBNYXhGb3JjZVNxYXJlZCA9IE1heEZvcmNlICogTWF4Rm9yY2U7XHJcbiAgICAgICAgICAgIEZsb2NrRGlzdGFuY2UgPSA4MCArIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoMzAuMGYpO1xyXG4gICAgICAgICAgICBGbG9ja0Rpc3RhbmNlU3FhcmVkID0gRmxvY2tEaXN0YW5jZSAqIEZsb2NrRGlzdGFuY2U7XHJcbiAgICAgICAgICAgIEZsb2NrQW5nbGUgPSAoZmxvYXQpTWF0aC5QSSAtIEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoKGZsb2F0KU1hdGguUEkgKiAwLjVmKTtcclxuICAgICAgICAgICAgQ29oZXNpb25XZWlnaHQgPSAwLjNmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjNmKSAtIDAuMWY7XHJcbiAgICAgICAgICAgIFNlcGFyYXRpb25XZWlnaHQgPSAwLjJmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjI1ZikgLSAwLjFmO1xyXG4gICAgICAgICAgICBBbGlnbm1lbnRXZWlnaHQgPSAwLjNmICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgwLjI1ZikgLSAwLjA1ZjtcclxuICAgICAgICAgICAgUFRoZXRhID0gRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdChNYXRoSGVscGVyLlR3b1BpKTtcclxuICAgICAgICAgICAgUGVybGluQmVhdCA9IEZsb2NrVG9vbHMuR2V0UmFuZG9tRmxvYXQoLTAuMDFmLCAwLjAxZik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHB1YmxpYyBvdmVycmlkZSB2b2lkIFVwZGF0ZShmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lLCBmbG9hdCBUaW1lTW9kaWZpZXIsIExpc3Q8QWdlbnQ+IEFnZW50cylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZsb2F0IG1vZF9EVCA9IERlbHRhVGltZSAqIFRpbWVNb2RpZmllcjtcclxuICAgICAgICAgICAgVXBkYXRlQ29sb3IobW9kX0RUKTtcclxuICAgICAgICAgICAgTGlzdDxBZ2VudD4gbmVpZ2hib3JzID0gRmluZE5laWdoYm9ycyhBZ2VudHMpO1xyXG4gICAgICAgICAgICBGbGl0KEN1cnJlbnRUaW1lLCBtb2RfRFQpO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGZsb2NraW5nRm9yY2UgPSBGbG9jayhuZWlnaGJvcnMpOyAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IGZsb2NraW5nRm9yY2U7ICAgICAgICAgICBcclxuICAgICAgICAgICAgYmFzZS5VcGRhdGUoQ3VycmVudFRpbWUsIG1vZF9EVCwgVGltZU1vZGlmaWVyLCBBZ2VudHMpO1xyXG4gICAgICAgICAgICBmbG9hdCBjb3NUaGV0YSA9IChmbG9hdClNYXRoLkNvcyhQVGhldGEpICogUFJhZGl1cztcclxuICAgICAgICAgICAgZmxvYXQgc2luVGhldGEgPSAoZmxvYXQpTWF0aC5TaW4oUFRoZXRhKSAqIFBSYWRpdXM7XHJcbiAgICAgICAgICAgIERyYXdQb3NpdGlvbiA9IFBvc2l0aW9uICsgbmV3IFZlY3RvcjIoY29zVGhldGEgLSBzaW5UaGV0YSwgY29zVGhldGEgKyBzaW5UaGV0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZvaWQgVXBkYXRlQ29sb3IoZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZmxvYXQgQWRkaXRpdmVDaGFuZ2UgPSAoTnVtTmVpZ2hib3JzIC0gMSkgKiAyMCAqIERlbHRhVGltZTtcclxuICAgICAgICAgICAgQ29sb3JGYWxsb2ZmID0gTWF0aEhlbHBlci5DbGFtcChDb2xvckZhbGxvZmYgKyBBZGRpdGl2ZUNoYW5nZSwgMCwgMjAwKTtcclxuICAgICAgICAgICAgaW50IFJHQlZhbHVlID0gKGludClDb2xvckZhbGxvZmYgKyA1NTtcclxuICAgICAgICAgICAgQWdlbnRDb2xvciA9IG5ldyBDb2xvcihSR0JWYWx1ZSwgUkdCVmFsdWUsIFJHQlZhbHVlLCBBZ2VudENvbG9yLkEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcml2YXRlIExpc3Q8QWdlbnQ+IEZpbmROZWlnaGJvcnMoTGlzdDxBZ2VudD4gQWdlbnRzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgTGlzdDxBZ2VudD4gbmVhcmJ5ID0gbmV3IExpc3Q8QWdlbnQ+KCk7XHJcbiAgICAgICAgICAgIGZsb2F0IGExID0gLUZsb2NrQW5nbGU7XHJcbiAgICAgICAgICAgIGZsb2F0IGEyID0gRmxvY2tBbmdsZTtcclxuICAgICAgICAgICAgVmVjdG9yMiBkaXIgPSBGbG9ja1Rvb2xzLkdldFNhZmVOb3JtYWwoVmVsb2NpdHkpO1xyXG4gICAgICAgICAgICBmb3JlYWNoKEFnZW50IGEgaW4gQWdlbnRzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihBZ2VudElkICE9IGEuQWdlbnRJZClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBWZWN0b3IyIHRvTmVpZ2hib3IgPSBWZWN0b3IyLlN1YnRyYWN0KGEuUG9zaXRpb24sIFBvc2l0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICBmbG9hdCBkc3EgPSB0b05laWdoYm9yLkxlbmd0aFNxdWFyZWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkc3EgPCBGbG9ja0Rpc3RhbmNlU3FhcmVkKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9OZWlnaGJvci5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmxvYXQgZG90UHJvZHVjdCA9IFZlY3RvcjIuRG90KGRpciwgdG9OZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsb2F0IHRoZXRhID0gKGZsb2F0KU1hdGguQWNvcyhkb3RQcm9kdWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodGhldGEgPCBGbG9ja0FuZ2xlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZWFyYnkuQWRkKGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIE51bU5laWdoYm9ycyA9IG5lYXJieS5Db3VudDtcclxuICAgICAgICAgICAgcmV0dXJuIG5lYXJieTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHZvaWQgRmxpdChmbG9hdCBDdXJyZW50VGltZSwgZmxvYXQgRGVsdGFUaW1lKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgLy9QT3JpZW50YXRpb24gPSBNYXRoSGVscGVyLldyYXBBbmdsZShQT3JpZW50YXRpb24pO1xyXG4gICAgICAgICAgICBQZXJsaW5CZWF0ID0gTWF0aEhlbHBlci5DbGFtcChQZXJsaW5CZWF0ICsgRmxvY2tUb29scy5HZXRSYW5kb21GbG9hdCgtMC4wNWYsIDAuMDVmKSwgLTFmLCAxZik7XHJcbiAgICAgICAgICAgIGZsb2F0IHBlcmxpblIgPSAoTm9pc2UuR2V0Tm9pc2UoQ3VycmVudFRpbWUgKiAxMDAsIDAsIDApKSAqIERlbHRhVGltZSAqIFBlcmxpbkJlYXQ7XHJcbiAgICAgICAgICAgIFBUaGV0YSA9IE1hdGhIZWxwZXIuV3JhcEFuZ2xlKFBUaGV0YSArIHBlcmxpblIpO1xyXG4gICAgICAgICAgICBQT3JpZW50YXRpb24gKz0gcGVybGluUjtcclxuICAgICAgICB9XHJcbiAgICAgICAgVmVjdG9yMiBGbG9jayhMaXN0PEFnZW50PiBOZWlnaGJvcnMpXHJcbiAgICAgICAgeyAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoTmVpZ2hib3JzLkNvdW50ID09IDApXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIHN0ZWVyID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGFsaWdubWVudCA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgVmVjdG9yMiBzZXBhcmF0aW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGNvaGVzaW9uID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBWZWN0b3IyIGN2ID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgICAgICBmb3JlYWNoKEFnZW50IGEgaW4gTmVpZ2hib3JzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCBkaXN0U3EgPSBWZWN0b3IyLkRpc3RhbmNlU3F1YXJlZChQb3NpdGlvbiwgYS5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCB0ID0gRmxvY2tUb29scy5NYXAoZGlzdFNxLCAwLCBGbG9ja0Rpc3RhbmNlU3FhcmVkLCAxLCAwKTtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgZGlyID0gVmVjdG9yMi5NdWx0aXBseShhLlZlbG9jaXR5LCB0KTtcclxuICAgICAgICAgICAgICAgIGlmKGEuSXNSb2d1ZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVlciArPSBTZWVrKGEuUG9zaXRpb24gKyBhLlZlbG9jaXR5ICogMTApICogQ29oZXNpb25XZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ZWVyO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50ICs9IGRpcjtcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc2VwID0gVmVjdG9yMi5TdWJ0cmFjdChQb3NpdGlvbiwgYS5Qb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICBmbG9hdCByID0gc2VwLkxlbmd0aFNxdWFyZWQoKTtcclxuICAgICAgICAgICAgICAgIHNlcC5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgICAgIHNlcCAqPSAxLjBmIC8gcjtcclxuICAgICAgICAgICAgICAgIHNlcGFyYXRpb24gKz0gc2VwO1xyXG4gICAgICAgICAgICAgICAgY3YgKz0gYS5Qb3NpdGlvbjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBhbGlnbm1lbnQgLz0gTmVpZ2hib3JzLkNvdW50O1xyXG4gICAgICAgICAgICBhbGlnbm1lbnQuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN0ZWVyICs9IGFsaWdubWVudCAqIEFsaWdubWVudFdlaWdodDtcclxuXHJcbiAgICAgICAgICAgIGN2IC89IE5laWdoYm9ycy5Db3VudDtcclxuICAgICAgICAgICAgY29oZXNpb24gPSBTZWVrKGN2KTtcclxuICAgICAgICAgICAgY29oZXNpb24uTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIHN0ZWVyICs9IGNvaGVzaW9uICogQ29oZXNpb25XZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICBzZXBhcmF0aW9uLk5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBzdGVlciArPSBzZXBhcmF0aW9uICogU2VwYXJhdGlvbldlaWdodDtcclxuICAgICAgICAgICAgcmV0dXJuIHN0ZWVyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBEcmF3KFNwcml0ZUJhdGNoIFNCKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgU0IuRHJhdyhUZXh0dXJlLCBEcmF3UG9zaXRpb24sIFRleHR1cmUuQm91bmRzLCBBZ2VudENvbG9yLCBQT3JpZW50YXRpb24gKiBNYXRoSGVscGVyLlR3b1BpLCBuZXcgVmVjdG9yMigwLjVmLCAwLjVmKSwgRHJhd1NjYWxlLCBTcHJpdGVFZmZlY3RzLk5vbmUsIDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGFzcyBSb2d1ZUFnZW50IDogQWdlbnRcclxuICAgIHtcclxuICAgICAgICBjbGFzcyBQYXN0UG9zaXRpb25cclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHB1YmxpYyBDb2xvciBDb2xvciA9IENvbG9yLldoaXRlO1xyXG4gICAgICAgICAgICBwdWJsaWMgVmVjdG9yMiBQb3NpdGlvbiA9IFZlY3RvcjIuWmVybztcclxuICAgICAgICB9XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyU3RyZW5ndGggPSAxMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJBbXAgPSAxNTAwMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJEaXN0YW5jZSA9IDEwMDtcclxuICAgICAgICBmbG9hdCBXYW5kZXJSYWRpdXMgPSAwO1xyXG4gICAgICAgIGZsb2F0IFdhbmRlclJhdGUgPSAwLjAxZjtcclxuICAgICAgICBmbG9hdCBXYW5kZXJUaGV0YSA9IDA7XHJcbiAgICAgICAgZmxvYXQgV2FuZGVyRGVsdGEgPSAwO1xyXG4gICAgICAgIGZsb2F0IFNlZWtTdHJlbmd0aCA9IDI7XHJcbiAgICAgICAgZmxvYXQgRGlsYXRpb25EaXN0YW5jZSA9IDE1MDtcclxuICAgICAgICBmbG9hdCBEaWxhdGlvbkRpc3RhbmNlU3F1YXJlZCA9IDA7XHJcbiAgICAgICAgTGlzdDxQYXN0UG9zaXRpb24+IFBhc3QgPSBuZXcgTGlzdDxQYXN0UG9zaXRpb24+KCk7XHJcbiAgICAgICAgVmVjdG9yMiBUYXJnZXQgPSBuZXcgVmVjdG9yMigyMDAsIDIwMCk7XHJcbiAgICAgICAgcHVibGljIFZlY3RvcjIgRmxvd0ZvcmNlID0gVmVjdG9yMi5aZXJvO1xyXG4gICAgICAgIEdhbWVPYmplY3QgVGFyZ2V0T2JqZWN0ID0gbnVsbDtcclxuICAgICAgICBwdWJsaWMgYm9vbCBJc1NlZWtpbmcgPSBmYWxzZTtcclxuICAgICAgICBwdWJsaWMgUm9ndWVBZ2VudChUZXh0dXJlMkQgaW5UZXh0dXJlKSA6IGJhc2UoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgSXNSb2d1ZSA9IHRydWU7XHJcbiAgICAgICAgICAgIE1heEZvcmNlID0gMTVmO1xyXG4gICAgICAgICAgICBNYXhTcGVlZCA9IDI1MC4wZjtcclxuICAgICAgICAgICAgTWF4Rm9yY2VTcWFyZWQgPSBNYXhGb3JjZSAqIE1heEZvcmNlO1xyXG4gICAgICAgICAgICBNYXhTcGVlZFNxdWFyZWQgPSBNYXhTcGVlZCAqIE1heFNwZWVkO1xyXG4gICAgICAgICAgICBEaWxhdGlvbkRpc3RhbmNlU3F1YXJlZCA9IERpbGF0aW9uRGlzdGFuY2UgKiBEaWxhdGlvbkRpc3RhbmNlO1xyXG4gICAgICAgICAgICBXYW5kZXJSYWRpdXMgPSBXYW5kZXJEaXN0YW5jZSAqIDEuMjVmO1xyXG4gICAgICAgICAgICBUZXh0dXJlID0gaW5UZXh0dXJlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwdWJsaWMgb3ZlcnJpZGUgdm9pZCBVcGRhdGUoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSwgZmxvYXQgVGltZU1vZGlmaWVyLCBMaXN0PEFnZW50PiBBZ2VudHMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBBY2NlbGVyYXRpb24gKz0gRmxvd0ZvcmNlO1xyXG4gICAgICAgICAgICBSb2d1ZVNlZWsoKTtcclxuICAgICAgICAgICAgV2FuZGVyKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUpO1xyXG4gICAgICAgICAgICBDcmVhdGVIaXN0b3J5KCk7XHJcbiAgICAgICAgICAgIGJhc2UuVXBkYXRlKEN1cnJlbnRUaW1lLCBEZWx0YVRpbWUsIFRpbWVNb2RpZmllciwgQWdlbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgdm9pZCBSb2d1ZVNlZWsoKVxyXG4gICAgICAgIHsgICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYoSXNTZWVraW5nKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBUYXJnZXQgPSBUYXJnZXRPYmplY3QgIT0gbnVsbCA/IFRhcmdldE9iamVjdC5Qb3NpdGlvbiA6IFZlY3RvcjIuWmVybztcclxuICAgICAgICAgICAgICAgIFZlY3RvcjIgc2Vla1ZlY3RvciA9IFNlZWsoVGFyZ2V0KTtcclxuICAgICAgICAgICAgICAgIHNlZWtWZWN0b3IuTm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgICAgICBzZWVrVmVjdG9yICo9IFNlZWtTdHJlbmd0aDtcclxuICAgICAgICAgICAgICAgIEFjY2VsZXJhdGlvbiArPSBzZWVrVmVjdG9yO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwcml2YXRlIHZvaWQgQ3JlYXRlSGlzdG9yeSgpXHJcbiAgICAgICAgeyAgICBcclxuICAgICAgICAgICAgZm9yIChpbnQgaSA9IFBhc3QuQ291bnQgLSAxOyBpID49IDA7IGktLSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgUGFzdFtpXS5Db2xvci5BIC09IDEwO1xyXG4gICAgICAgICAgICAgICAgaWYgKFBhc3RbaV0uQ29sb3IuQSA8IDEwKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIFBhc3QuUmVtb3ZlQXQoaSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKFBhc3QuQ291bnQgPiAwKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpbnQgaW5kZXggPSBGbG9ja1Rvb2xzLkdldFJhbmRvbUludGVnZXIoUGFzdC5Db3VudCk7XHJcbiAgICAgICAgICAgICAgICBDb2xvciBQaWNrZWRDb2xvciA9IEZsb2NrVG9vbHMuUGljazxDb2xvcj4oZ2xvYmFsOjpCcmlkZ2UuU2NyaXB0LkNhbGxGb3IobmV3IExpc3Q8Q29sb3I+KCksKF9vMSk9PntfbzEuQWRkKENvbG9yLkxhd25HcmVlbik7X28xLkFkZChDb2xvci5UdXJxdW9pc2UpO19vMS5BZGQoQ29sb3IuT3JhbmdlUmVkKTtfbzEuQWRkKENvbG9yLkxpZ2h0WWVsbG93KTtfbzEuQWRkKENvbG9yLldoaXRlKTtfbzEuQWRkKENvbG9yLkZsb3JhbFdoaXRlKTtyZXR1cm4gX28xO30pKSAqIDAuNWY7XHJcbiAgICAgICAgICAgICAgICBQaWNrZWRDb2xvci5BID0gUGFzdFtpbmRleF0uQ29sb3IuQTtcclxuICAgICAgICAgICAgICAgIFBhc3RbaW5kZXhdLkNvbG9yID0gUGlja2VkQ29sb3I7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgUGFzdC5BZGQobmV3IFBhc3RQb3NpdGlvbigpIHsgUG9zaXRpb24gPSBQb3NpdGlvbiArIEZsb2NrVG9vbHMuR2V0UmFuZG9tVmVjdG9yMigtMiwgMiwgLTIsIDIpLCBDb2xvciA9IENvbG9yLldoaXRlIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdm9pZCBXYW5kZXIoZmxvYXQgQ3VycmVudFRpbWUsIGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFZlY3RvcjIgZm9yd2FyZF90YXJnZXQgPSBuZXcgVmVjdG9yMigoZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pLCAoZmxvYXQpTWF0aC5TaW4oT3JpZW50YXRpb24pKTtcclxuICAgICAgICAgICAgZm9yd2FyZF90YXJnZXQgKj0gV2FuZGVyRGlzdGFuY2U7XHJcblxyXG4gICAgICAgICAgICBXYW5kZXJEZWx0YSA9IE1hdGhIZWxwZXIuQ2xhbXAoV2FuZGVyRGVsdGEgKyBGbG9ja1Rvb2xzLkdldFJhbmRvbUZsb2F0KC0xLCAxKSwgLTEwLCAxMCk7XHJcbiAgICAgICAgICAgIGZsb2F0IHZhbHVlID0gTm9pc2UuR2V0Tm9pc2UoQ3VycmVudFRpbWUgKiBXYW5kZXJEZWx0YSAqIFdhbmRlclJhdGUsIDAsIDApICogV2FuZGVyQW1wO1xyXG4gICAgICAgICAgICBXYW5kZXJUaGV0YSArPSBNYXRoSGVscGVyLldyYXBBbmdsZShXYW5kZXJUaGV0YSArIHZhbHVlICogRGVsdGFUaW1lKTtcclxuXHJcbiAgICAgICAgICAgIGZsb2F0IHggPSBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5Db3MoV2FuZGVyVGhldGEpIC0gV2FuZGVyUmFkaXVzICogKGZsb2F0KU1hdGguU2luKFdhbmRlclRoZXRhKTtcclxuICAgICAgICAgICAgZmxvYXQgeSA9IFdhbmRlclJhZGl1cyAqIChmbG9hdClNYXRoLkNvcyhXYW5kZXJUaGV0YSkgKyBXYW5kZXJSYWRpdXMgKiAoZmxvYXQpTWF0aC5TaW4oV2FuZGVyVGhldGEpO1xyXG5cclxuICAgICAgICAgICAgVmVjdG9yMiB3YW5kZXJfdGFyZ2V0ID0gbmV3IFZlY3RvcjIoZm9yd2FyZF90YXJnZXQuWCArIHgsIGZvcndhcmRfdGFyZ2V0LlkgKyB5KTtcclxuICAgICAgICAgICAgd2FuZGVyX3RhcmdldC5Ob3JtYWxpemUoKTtcclxuICAgICAgICAgICAgQWNjZWxlcmF0aW9uICs9IHdhbmRlcl90YXJnZXQgKiBXYW5kZXJTdHJlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIG92ZXJyaWRlIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcmVhY2goUGFzdFBvc2l0aW9uIHAgaW4gUGFzdClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgU0IuRHJhdyhUZXh0dXJlLCBwLlBvc2l0aW9uLCBUZXh0dXJlLkJvdW5kcywgcC5Db2xvciwgMCwgbmV3IFZlY3RvcjIoMC41ZiwgMC41ZiksIERyYXdTY2FsZSwgU3ByaXRlRWZmZWN0cy5Ob25lLCAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJ1c2luZyBNaWNyb3NvZnQuWG5hLkZyYW1ld29yaztcclxudXNpbmcgTWljcm9zb2Z0LlhuYS5GcmFtZXdvcmsuR3JhcGhpY3M7XHJcbnVzaW5nIFN5c3RlbTtcclxuXHJcbm5hbWVzcGFjZSBTaXJGbG9ja3NhbG90XHJcbntcclxuICAgIHB1YmxpYyBjbGFzcyBNb29uIDogR2FtZU9iamVjdFxyXG4gICAge1xyXG4gICAgICAgIHJlYWRvbmx5IGZsb2F0IFNwZWVkID0gMC4wMDAwNWY7XHJcbiAgICAgICAgcmVhZG9ubHkgVmVjdG9yMiBBbmNob3JQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKDEyMDAsIDUyMDApO1xyXG4gICAgICAgIGZsb2F0IE9yaWVudGF0aW9uID0gMC4wZjsgICAgICAgIFxyXG4gICAgICAgIHB1YmxpYyBUZXh0dXJlMkQgVGV4dHVyZTtcclxuXHJcbiAgICAgICAgcHVibGljIE1vb24oKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSAoZmxvYXQpTWF0aC5QSSAqIDEuOTNmO1xyXG4gICAgICAgICAgICBQb3NpdGlvbiA9IG5ldyBWZWN0b3IyKEFuY2hvclBvc2l0aW9uLlggKyAoKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIDUxMDAqKGZsb2F0KU1hdGguU2luKE9yaWVudGF0aW9uKSksIEFuY2hvclBvc2l0aW9uLlkgKyAoLTUxMDAqKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHVibGljIHZvaWQgVXBkYXRlKGZsb2F0IERlbHRhVGltZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFBvc2l0aW9uID0gbmV3IFZlY3RvcjIoQW5jaG9yUG9zaXRpb24uWCArICgoZmxvYXQpTWF0aC5Db3MoT3JpZW50YXRpb24pICsgNTEwMCAqIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpLCBBbmNob3JQb3NpdGlvbi5ZICsgKC01MTAwICogKGZsb2F0KU1hdGguQ29zKE9yaWVudGF0aW9uKSArIChmbG9hdClNYXRoLlNpbihPcmllbnRhdGlvbikpKTtcclxuICAgICAgICAgICAgT3JpZW50YXRpb24gPSBNYXRoSGVscGVyLldyYXBBbmdsZShPcmllbnRhdGlvbiArIERlbHRhVGltZSAqIFNwZWVkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGludGVybmFsIHZvaWQgRHJhdyhTcHJpdGVCYXRjaCBTQilcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIFNCLkRyYXcoVGV4dHVyZSwgUG9zaXRpb24sIFRleHR1cmUuQm91bmRzLCBDb2xvci5XaGl0ZSwgMCwgbmV3IFZlY3RvcjIoMC41ZiwgMC41ZiksIDEsIFNwcml0ZUVmZmVjdHMuTm9uZSwgMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdCn0K
