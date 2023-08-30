class Cursor{
	constructor(sheet){
		this.sheet = sheet
		this.loc = {x:1, y:1}
		this.locations = []
		this.classList = []
		this.locationUpdate = (loc)=>loc
	}

	static down(loc){
		loc.y++
		return loc
	}
	static up(loc){
		loc.y--
		return loc
	}

	static left(loc){
		loc.x--
		return loc
	}
	static right(loc){
		loc.x++
		return loc
	}


	static number(i){
		return i.toString()
	}

	static currency(f){
		return f.toFixed(2)
	}

	static percentage(f){
		return (f*100).toFixed(2)
	}


	set classes(classList){
		this.classList = classList
	}

	get classes(){
		return this.classList
	}


	get x(){
		return this.loc.x
	}

	get y(){
		return this.loc.y
	}

	set x(x){
		this.loc.x = x
	}

	set y(y){
		this.loc.y = y
	}


	push(){
		const x = this.loc.x
		const y = this.loc.y
		this.locations.push(this.loc)
		this.loc = {x:x, y:y}
	}

	pop(){
		this.loc = this.locations.pop()
	}

	set movement(f){
		this.locationUpdate = f
	}

	add(data, spanX=1, spanY=1){

		const elem = document.createElement('cell')
		elem.style['grid-column'] = `${this.loc.x} / span ${spanX}`
		elem.style['grid-row'] = `${this.loc.y} / span ${spanY}`
		
		this.loc = this.locationUpdate(this.loc)

		elem.classList.remove(...elem.classList)
		elem.classList.add(...this.classList)

		this.sheet.appendChild(elem)
		elem.innerHTML = data
		return elem
	}

	addNumber(data){
		const oldClasses = this.classList
		this.classList = [...oldClasses, 'number']
		const ret = this.add( Cursor.number(data) )
		this.classList = oldClasses

		return ret
	}

	addEuro(data){
		const oldClasses = this.classList
		this.classList = [...oldClasses, 'euro']
		const ret = this.add( Cursor.currency(data) )
		this.classList = oldClasses

		return ret
	}

	addPercentage(data){
		const oldClasses = this.classList
		this.classList = [...oldClasses, 'number', 'percentage']
		const ret = this.add( Cursor.currency(data) )
		this.classList = oldClasses

		return ret
	}

}
