const Benchmark = require("benchmark")
const { squareArray } = require(".")
const wasm = require(".")

function runSuite(suite) {
    console.log("Running", suite.name)

    suite
        .on('cycle', (event) => {
            console.log(String(event.target))
        })
        .on('complete', function (event) {
            console.log(this.filter('fastest').map('name') + ' won')
        })
        .run()
}


function addTest() {
    function addJs(a, b) {
        return a + b
    }
    const AddAs = wasm.add

    const test = Benchmark.Suite('add')

    test
        .add('AssemblyScript', function () {
            AddAs(10, 20)
        })
        .add('JavaScript', function () {
            addJs(10, 20)
        })
    runSuite(test)
}

function factorialTest() {
    function factorialJs(i) {
        return i === 0 ? 1 : i * factorialJs(i - 1)
    }
    const factorialAs = wasm.factorial

    const testSmall = Benchmark.Suite('factorialSmall')

    testSmall
        .add('AssemblyScript', function () {
            factorialAs(3)
        })
        .add('JavaScript', function () {
            factorialJs(3)
        })
    runSuite(testSmall)

    const testLarge = Benchmark.Suite('factorialLarge')

    testLarge
        .add('AssemblyScript', function () {
            factorialAs(20)
        })
        .add('JavaScript', function () {
            factorialJs(20)
        })
    runSuite(testLarge)
}

function squareArrayTest() {
    function squareArrayJs(arr) {
        const len = arr.length
        const result = new Int32Array(len)
        for ( let i = 0 ; i < len ; ++i) {
            const e = arr[i]
            result[i] = e * e
        }

        return result;
    }
    const squareArrayAs = wasm.squareArray

    const testSmall = Benchmark.Suite('squareArraySmall')
    //const largeArray = new Int32Array(1000).fill(1).map((val, i) => val + (i * 0.01))
    const largeArray = [...Array(1000).keys()]
    testSmall
        .add('AssemblyScript', function () {
            squareArrayAs([1, 2, 3])
        })
        .add('JavaScript', function () {
            squareArrayJs([1, 2, 3])
        })
    runSuite(testSmall)

    const testLarge = Benchmark.Suite('squareArrayLarge')

    testLarge
        .add('AssemblyScript', function () {
            squareArrayAs(largeArray)
        })
        .add('JavaScript', function () {
            squareArrayJs(largeArray)
        })
    runSuite(testLarge)
}

function squareArrayGenTest() {
    function squareArrayGenJs(len) {
        const arr = [...Array(len).keys()]
        const result = new Int32Array(len)
        for ( let i = 0 ; i < len ; ++i) {
            const e = arr[i]
            result[i] = e * e
        }

        return result;
    }
    const squareArrayGenAs = wasm.squareArrayGen

    const testSmall = new Benchmark.Suite('squareArrayGenSmall')

    testSmall
        .add('AssemblyScript', function () {
            squareArrayGenAs(20)
        })
        .add('JavaScript', function () {
            squareArrayGenJs(20)
        })
    runSuite(testSmall)

    const testLarge = new Benchmark.Suite('squareArrayGenLarge')

    testLarge
        .add('AssemblyScript', function () {
            squareArrayGenAs(200)
        })
        .add('JavaScript', function () {
            squareArrayGenJs(200)
        })
    runSuite(testLarge)
}

//addTest() 
//factorialTest()
squareArrayTest()
//squareArrayGenTest()