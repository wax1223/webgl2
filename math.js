class vec2
{
    constructor(x, y)
    {
        this.x = x || 0;
        this.y = y || 0;
    }
    add(v)
    {
        return new vec2(this.x + v.x, this.y + v.y);
    }
    sub(v)
    {
        return new vec2(this.x - v.x, this.y - v.y);
    }
    mul(v)
    {
        return new vec2(this.x * v.x, this.y * v.y);
    }
    div(v)
    {
        if(!v.x || !v.y) throw "vx or vy should not be zero.";
        return new vec2(this.x / v.x, this.y / v.y);
    }
    toFloatArray()
    {
        return new Float32Array(this.x, this.y);
    }
}

class vec3
{
    constructor(x, y, z)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
    }
    add(v)
    {
        return new vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    sub(v)
    {
        return new vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    mul(v)
    {
        return new vec3(this.x * v.x, this.y * v.y, this.z * v.z);
    }
    div(v)
    {
        if(!v.x || !v.y || !v.z) throw "vx, vy, vz should not be zero.";
        return new vec3(this.x / v.x, this.y / v.y, this.z / v.z );
    }
    toFloatArray()
    {
        return new Float32Array(this.x, this.y, this.z);
    }
}

class vec4
{
    constructor(x, y, z, w)
    {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.w = w || 0;
    }
    add(v)
    {
        return new vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }
    sub(v)
    {
        return new vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }
    mul(v)
    {
        return new vec4(this.x * v.x, this.y * v.y, this.z * v.z, this.w * v.w);
    }
    div(v)
    {
        if(!v.x || !v.y || !v.z || !v.w) throw "vx, vy, vz, vw should not be zero.";
        return new vec4(this.x / v.x, this.y / v.y, this.z / v.z, this.w / v.w);
    }
    toFloatArray()
    {
        return new Float32Array([this.x, this.y, this.z, this.w]);
    }
}

class mat2x2
{
    constructor(a00, a01, a10, a11)
    {
        if(typeof a00 === "undefined" )
        {
            this.a00 = 1.0;
            this.a01 = 0;
            this.a10 = 0;
            this.a11 = 1.0;
        }
        else
        {
            this.a00 = a00;
            this.a01 = a01;
            this.a10 = a10;
            this.a11 = a11;
        }
    }
    mul(m)
    {
        return new mat2x2(this.a00 * m.a00 + this.a01 * m.a10,
                          this.a00 * m.a01 + this.a01 * m.a11,
                          this.a10 * m.a00 + this.a11 * m.a10,
                          this.a10 * m.a01 + this.a11 * m.a11);
    }
    transpose()
    {
        return new mat2x2(this.a00, this.a10, 
                          this.a01, this.a11);
    }
    invert()
    {
        return new mat2x2(this.a11, -this.a10,
                          -this.a01, this.a00).mulnum(1.0 / this.det());
    }
    mulvec(v)
    {
        return new vec2(this.a00 * v.x + this.a01 * v.y,
                        this.a10 * v.x + this.a11 * v.y);
    }
    mulnum(n)
    {
        return new mat2x2(this.a00 * n, this.a01 * n,
                          this.a10 * n, this.a11 * n);
    }
    det()
    {
        return (this.a00 * this.a11 - this.a01 * this.a10);
    }
    toFloatArray()
    {
        return new Float32Array([this.a00,this.a01,this.a10,this.a11]);
    }
}


class mat3x3
{
    constructor(a00 , a01, a02, a10, a11, a12, a20, a21, a22)
    {
        if(typeof a00 === "undefined" )
        {
            this.a00 = 1.0; this.a01 = 0; this.a02 = 0;
            this.a10 = 0; this.a11 = 1.0; this.a12 = 0;
            this.a20 = 0; this.a21 = 0; this.a22 = 1.0;
        }
        else
        {
            this.a00 = a00; this.a01 = a01; this.a02 = a02;
            this.a10 = a10; this.a11 = a11; this.a12 = a12;
            this.a20 = a20; this.a21 = a21; this.a22 = a22;
        }
    }
    mul(m)
    {
        return new mat3x3(
                          this.a00 * m.a00 + this.a01 * m.a10 + this.a02 * m.a20,
                          this.a00 * m.a01 + this.a01 * m.a11 + this.a02 * m.a21,
                          this.a00 * m.a02 + this.a01 * m.a12 + this.a02 * m.a22,

                          this.a10 * m.a00 + this.a11 * m.a10 + this.a12 * m.a20,
                          this.a10 * m.a01 + this.a11 * m.a11 + this.a12 * m.a21,
                          this.a10 * m.a02 + this.a11 * m.a12 + this.a12 * m.a22,

                          this.a20 * m.a00 + this.a21 * m.a10 + this.a22 * m.a20,
                          this.a20 * m.a01 + this.a21 * m.a11 + this.a22 * m.a21,
                          this.a20 * m.a02 + this.a21 * m.a12 + this.a22 * m.a22,
                          );
    }
    mulvec(v)
    {
        return new vec3(this.a00 * v.x + this.a01 * v.y + this.a02 * v.z,
                        this.a10 * v.x + this.a11 * v.y + this.a12 * v.z,
                        this.a20 * v.x + this.a21 * v.y + this.a22 * v.z);
    }
    mulnum(n)
    {
        return new mat3x3(this.a00 * n, this.a01 * n, this.a02 * n,
                          this.a10 * n, this.a11 * n, this.a12 * n,
                          this.a20 * n, this.a21 * n, this.a22 * n);
    }
    transpose()
    {
        return new mat3x3(this.a00, this.a10, this.a20, 
                          this.a01, this.a11, this.a21,
                          this.a02, this.a12, this.a22);
    }
    invert()
    {
        var dett = this.det()
        if(!dett) throw "determinator should not equal to zero";
        var com = this.company();
        return  com.mulnum(1.0 / dett)
    }
    company()
    {
        return new mat3x3((new mat2x2(this.a11, this.a12, this.a21, this.a22)).det(),
                     - (new mat2x2(this.a10, this.a12, this.a20, this.a22)).det(),
                     + (new mat2x2(this.a10, this.a11, this.a20, this.a21)).det(),

                     -(new mat2x2(this.a01, this.a02, this.a21, this.a22)).det(),
                     +(new mat2x2(this.a00, this.a02, this.a20, this.a22)).det(),
                     -(new mat2x2(this.a00, this.a01, this.a20, this.a21)).det(),

                     +(new mat2x2(this.a01, this.a02, this.a11, this.a12)).det(),
                     -(new mat2x2(this.a00, this.a02, this.a10, this.a12)).det(),
                     +(new mat2x2(this.a00, this.a01, this.a10, this.a11)).det()
            ).transpose();
    }
    det()
    {
        return  this.a00 * (new mat2x2(this.a11, this.a12, this.a21, this.a22)).det()
              - this.a01 * (new mat2x2(this.a10, this.a12, this.a20, this.a22)).det()
              + this.a02 * (new mat2x2(this.a10, this.a11, this.a20, this.a21)).det();

              // - this.a10 * (new mat2x2(this.a01, this.a02, this.a21, this.a22)).det()
              // + this.a11 * (new mat2x2(this.a00, this.a02, this.a20, this.a22)).det()
              // - this.a12 * (new mat2x2(this.a00, this.a01, this.a20, this.a21)).det()

              // + this.a20 * (new mat2x2(this.a01, this.a02, this.a11, this.a12)).det()
              // - this.a21 * (new mat2x2(this.a00, this.a02, this.a10, this.a12)).det()
              // + this.a22 * (new mat2x2(this.a00, this.a01, this.a10, this.a11)).det();
    }
    toFloatArray()
    {
        return new Float32Array([
        this.a00, this.a01, this.a02, 
        this.a10, this.a11, this.a12, 
        this.a20, this.a21, this.a22]
        );
    }
}


class mat4x4
{
}

function test()
{
    var a = new vec2(7, 2);
    var b = new vec2(2, 1);
    var c = a.add(b);
    var d = a.sub(b);
    var e = a.mul(b);
    var f = a.div(b);
    var a3 = new vec3(1, 12, 3)
    var b3 = new vec3(11, 22, 13)
    var c3 = a3.add(b3);
    var d3 = a3.sub(b3);
    var e3 = a3.mul(b3);
    var f3 = a3.div(b3);
    console.log(c3,d3,e3,f3);
    var a4 = new vec4(1, 12, 3, 31)
    var b4 = new vec4(17, 32, 13, 12)
    var c4 = a4.add(b4);
    var d4 = a4.sub(b4);
    var e4 = a4.mul(b4);
    var f4 = a4.div(b4);

    var m22 = new mat2x2();
    var m221 = new mat2x2(4, 9, 8, 21);
    var m222 = new mat2x2(3, 7, 83, 1);
    var m223 = new mat2x2(1, 3, 1, 2);
    console.log(m22.mul(m221))
    console.log(m221.mul(m222).mul(m221.invert()));
    P(m221.mul(m221).mul(m221).transpose())
    P(m223.mulvec(a))

    P(m223.mulnum(2).det())

    var m330 = new mat3x3()
    var m331 = new mat3x3(-3, 2, -5, -1, 0, -2, 3, -4, 1);
    P(m330)
    P("det")
    P(m330.det())
    P("transpose")
    P(m330.transpose())
    P("company")
    P(m330.company())
    P("invert")
    P(m330.invert())

    m330 = m330.mulnum(2)
    P("det")
    P(m330.det())
    P("transpose")
    P(m330.transpose())
    P("company")
    P(m330.company())
    P("invert")
    P(m330.invert())

    P(m331)
    P(m331.company())
}