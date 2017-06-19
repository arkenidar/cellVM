
/*
Virtual Machine that is integer-numbers-based(byte-based) and self-modifying.

https://docs.microsoft.com/en-us/dotnet/standard/io/memory-mapped-files
*/

function log(data, optional_prefix){
	const debug_enabled = true
	if(debug_enabled){
		data = JSON.stringify(data)
		if(optional_prefix != undefined){
			data = optional_prefix + ': ' + data
		}
		console.log(data)
	}
}

var description = 'Virtual Machine that is integer-numbers-based(byte-based) and self-modifying.'
console.log(description)

// integers initialization
var max_integer = 0xFF // 225 is max integer for a byte
var max_integer_modulo = max_integer + 1
var max_index = max_integer

// array initialization
var bytes = [] // 225 is max integer for a byte
var bytes_decrement_by_3 = [3,4,5, 6,7,8, 0,1,0] // 225 is max integer for a byte
var array = bytes_decrement_by_3 // array of bytes: 225 is max integer for a byte

run() // run after intialization

function run(){

while(current()<max_index){
	
	log(current(), '@current')
	
	/*
	// integers increment with modulo (indirect indexing with triplets of contiguous integers)
	integers_set(integers(current()+0),
	( integers(integers(current()+0)) + integers(integers(current()+1)) ) % max_integer_modulo )

	current_set( integers(integers(current()+2)) )
	*/
	// integers increment with modulo (indirect indexing with triplets of contiguous integers)
	
	var accumulator_index = integers(current()+0)
	var accumulator_value_before = integers(accumulator_index)
	var delta = integers(integers(current()+1))
	var accumulator_value_after = ( accumulator_value_before + delta ) % max_integer_modulo
	integers_set(accumulator_index, accumulator_value_after)

	var next = integers(integers(current()+2))
	current_set( next )

	log({accumulator_index, accumulator_value_before, delta, accumulator_value_after, next}, 'after step dump')
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
