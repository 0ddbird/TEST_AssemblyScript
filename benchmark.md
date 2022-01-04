# Benchmark results

## Add

| Language | Performances | Tests sampled |
|-|-|-|
|AssemblyScript|x 222,386,097 ops/sec ±0.75% | 93 |
|**JavaScript**|x 1,159,234,219 ops/sec ±0.18% | 97 |

JavaScript is faster on simple operations like adding 10 + 20

## Factorial

### Small

| Language | Performances | Tests sampled |
|-|-|-|
|AssemblyScript | x 111,210,277 ops/sec ±0.25% | 97 |
|**JavaScript**| **x 112,581,006 ops/sec** ±0.23% | 97 |

JavaScript is slightly faster on a small value like factorial(3)

### Large

| Language | Performances | Tests sampled |
|-|-|-|
|**AssemblyScript**|**x 13,765,773 ops/sec** ±0.35% | 93 |
|JavaScript |x 8,129,834 ops/sec ±0.24% | 97 |

AssemblyScript is faster on a bigger value like factorial(20)

## Square Array

### Small

| Language | Performances | Tests sampled |
|-|-|-|
|AssemblyScript | x 1,010,746 ops/sec ±0.20% | 96 |
|**JavaScript**| **x 36,264,757 ops/sec** ±0.68% | 93 |

### Large

| Language | Performances | Tests sampled |
|-|-|-|
|AssemblyScript |x 221,609 ops/sec ±1.17% |88|
|**JavaScript**|**x 621,074 ops/sec** ±2.69% |84|

JavaScipt is a lot faster on an array, however with both languages, the array is made from JS and passed to AS.
`const largeArray = [...Array(1000).keys()]`

## Square Array (Generated array)

Here we only give an array length instead of giving the array itself.
The JS version of the function will create a new array like so: `const arr = [...Array(len).keys()]`
The AS version of the function will create a new array like so: `const arr = new Int32Array(len).map((_, i) => i)`
Which should be the same process, but done in JS for the first and WebAssembly for the second.

### Small generated array

| Language | Performances | Tests sampled|
|-|-|-|
|AssemblyScript |x 1,005,827 ops/sec ±0.35% |(96 runs sampled)|
|**JavaScript**|**x 1,108,765 ops/sec ±0.34%** |(95 runs sampled)|

JavaScript is still faster on a small array (array length passed as argument : 20)

### Large generated array

| Language | Performances | Tests sampled|
|-|-|-|
|**AssemblyScript**|**x 470,210 ops/sec** ±1.21% |(93 runs sampled)|
|JavaScript |x 199,379 ops/sec ±0.33% | (97 runs sampled)|

AssemblyScript is faster on a bigger array (array length passed as argument : 200)