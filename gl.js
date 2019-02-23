'use strict';

function P(msg)
{
    console.log(msg);
}


var vertices = 
[
   0, 0, 1.0,
   0, 800, 1.0,
   800, 800, 1.0,
];
var indices = [0,1,2];

var vertCode =
`#version 300 es
in vec3 coordinates;
uniform mat3 projmat;
void main(void)
{
    vec3 cp = projmat * coordinates;
    cp.z = 0.0;
    gl_Position = vec4(cp, 1.0);
}`;

var fragCode =
`#version 300 es
precision highp float;
precision highp int;
out vec4 fragcolor;

void main(void)
{
  fragcolor = vec4(0.0, 0.0, 0.0, .1);
}`;


var shaderProgram;
var vertex_buffer;
var Index_Buffer;
var vao;




var icy =
{
    setup : function()
    {
        var spector = new SPECTOR.Spector();
        spector.displayUI();
        var canvas = document.getElementById('myCanvas');
        this.gl = canvas.getContext('webgl2');
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.projmat = new mat3x3(2.0 / canvas.width, 0                 ,  -1,
                                                   0, -2.0 / canvas.height, 1,
                                  0, 0, 1);
        // this.projmat = new mat3x3();
    },
    CreateBuffer : function(bufType, data)
    {
        var buffer = this.gl.createBuffer();
        this.gl.bindBuffer(bufType, buffer);
        this.gl.bufferData(bufType, data, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(bufType, null);
        return buffer;
    },
    CreateProgram : function(vsShaderCode, fsShaderCode)
    {
        var p = this.gl.createProgram();
        var vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(vertShader, vsShaderCode);
        this.gl.compileShader(vertShader);
        var message = this.gl.getShaderInfoLog(vertShader);
        if(message.length > 0) console.log("vertShader: " + message);

        var fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(fragShader, fsShaderCode);
        this.gl.compileShader(fragShader);
        message = this.gl.getShaderInfoLog(fragShader);
        if(message.length > 0) console.log("fragShader: " + message);

        this.gl.attachShader(p, vertShader);
        this.gl.attachShader(p, fragShader);
        this.gl.linkProgram(p);
        var success = this.gl.getProgramParameter(p, this.gl.LINK_STATUS);
        if (success)
        {
            return p;
        }
        else
        {
            console.log(this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
        }
    },
    init : function()
    {
        shaderProgram = this.CreateProgram(vertCode, fragCode);
        vertex_buffer = this.CreateBuffer(this.gl.ARRAY_BUFFER,  new Float32Array(vertices));
        Index_Buffer = this.CreateBuffer(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices));

        vao = this.gl.createVertexArray();
        this.gl.bindVertexArray(vao);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, Index_Buffer);
        var coord = this.gl.getAttribLocation(shaderProgram, "coordinates");
        this.gl.vertexAttribPointer(coord, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(coord);
        this.u_projmat = this.gl.getUniformLocation(shaderProgram, "projmat");
    },
    draw: function()
    {
        this.gl.clearColor(0.5, 0.5, 0.5, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
        this.gl.useProgram(shaderProgram);
        this.gl.bindVertexArray(vao);

        this.gl.uniformMatrix3fv(this.u_projmat, true, this.projmat.toFloatArray());
        this.gl.drawElements(this.gl.TRIANGLES, indices.length, this.gl.UNSIGNED_SHORT, 0);
        window.requestAnimationFrame(this.draw.bind(this));
    }

}

icy.setup();
icy.init();
icy.draw();


