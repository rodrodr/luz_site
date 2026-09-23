import math
def srgb2lin(c): c/=255; return c/12.92 if c<=0.04045 else ((c+0.055)/1.055)**2.4
def lin2srgb(c): v = 12.92*c if c<=0.0031308 else 1.055*c**(1/2.4)-0.055; return v
def hex2rgb(h): h=h.lstrip('#'); return [int(h[i:i+2],16) for i in (0,2,4)]
def rgb2oklab(rgb):
    r,g,b=[srgb2lin(x) for x in rgb]
    l=0.4122214708*r+0.5363325363*g+0.0514459929*b
    m=0.2119034982*r+0.6806995451*g+0.1073969566*b
    s=0.0883024619*r+0.2817188376*g+0.6299787005*b
    l,m,s=[x**(1/3) for x in (l,m,s)]
    return (0.2104542553*l+0.7936177850*m-0.0040720468*s, 1.9779984951*l-2.4285922050*m+0.4505937099*s, 0.0259040371*l+0.7827717662*m-0.8086757660*s)
def oklab2rgb(L,a,b):
    l=L+0.3963377774*a+0.2158037573*b; m=L-0.1055613458*a-0.0638541728*b; s=L-0.0894841775*a-1.2914855480*b
    l,m,s=l**3,m**3,s**3
    r=4.0767416621*l-3.3077115913*m+0.2309699292*s; g=-1.2684380046*l+2.6097574011*m-0.3413193965*s; bb=-0.0041960863*l-0.7034186147*m+1.7076147010*s
    return [lin2srgb(x) for x in (r,g,bb)]
def lch(h):
    L,a,b=rgb2oklab(hex2rgb(h)); return L, math.hypot(a,b), math.degrees(math.atan2(b,a))
def mk(L,C,H):
    while True:
        a=C*math.cos(math.radians(H)); b=C*math.sin(math.radians(H)); rgb=oklab2rgb(L,a,b)
        if all(-1e-4<=x<=1+1e-4 for x in rgb): return '#'+''.join('%02X'%round(min(1,max(0,x))*255) for x in rgb)
        C-=0.002
def lum(h): r,g,b=[srgb2lin(x) for x in hex2rgb(h)]; return 0.2126*r+0.7152*g+0.0722*b
def cr(a,b): la,lb=sorted([lum(a),lum(b)],reverse=True); return (la+0.05)/(lb+0.05)
for tema,bg,acc,Ls in [('oscuro','#0F110E','#C9A24E',[0.535,0.625,0.715,0.805,0.905]),('claro','#F6F2E9','#8C6100',[0.628,0.56,0.492,0.424,0.356])]:
    L0,C0,H0=lch(acc); print(tema,'accent L C H',round(L0,3),round(C0,3),round(H0,1))
    out=[]
    for L in Ls: out.append(mk(L,C0,H0))
    print(' '.join(out)); print(' contraste con fondo:',' · '.join('%.1f'%cr(x,bg) for x in out))
    print(' entre contiguos:',' · '.join('%.2f'%cr(out[i],out[i+1]) for i in range(4)))
