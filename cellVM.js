
/*
Virtual Machine that is integer-numbers-based(byte-based) and self-modifying.

https://docs.microsoft.com/en-us/dotnet/standard/io/memory-mapped-files
*/
var description = 'Virtual Machine that is integer-numbers-based(byte-based) and self-modifying.'
console.log(description)

// integers initialization
var max_integer = 0xFF // 225 is max integer for a byte
var max_integer_modulo = max_integer + 1
var max_index = max_integer

// array initialization
var bytes = [] // 225 is max integer for a byte
var array = bytes // array of bytes: 225 is max integer for a byte

run() // run after intialization

function run(){

current(0) // initialize current

while(current()<max_index){
	// integers increment with modulo (indirect indexing with triplets of contiguous integers)
	integers_set(integers(current()+0),
	( integers(integers(current()+0)) + integers(integers(current()+1)) ) % max_integer_modulo )

	current_set( integers(integers(current()+2)) )
}

console.log('no more running')
console.log('current() is: '+current())

}

// current index
function current(){
	return integers(0)
}

function current_set(value){
	return integers_set(0, value)
}

// integers array
function integers(index){
	return array[index]
}

function integers_set(index, value){
	return array[index] = value
}
