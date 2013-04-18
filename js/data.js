html5sql.openDatabase("com.fracturedvisionmedia.absinthes", "Absinthe Database", 3*1024*1024);

function checkDB(){
	html5sql.process(
		 [
			"CREATE TABLE if not exists brands (id INTEGER PRIMARY KEY, name TEXT, abv INTEGER, notes TEXT);",
			"SELECT * FROM brands;"
		 ],
		 function(transaction, results, rowsArray){
			 if(rowsArray.length > 1){
				 //just read the DB
				 console.log("data!");
				 readDB();
			 }else{
				 //DB is fresh - let's populate it with some defaults
				 console.log("no data :(");
				 populateDB();
			 }
		 }, catchError);
}

function populateDB(){
	html5sql.process(
		 [
			"INSERT INTO brands (name, abv, notes) VALUES ('Leopold Bros. Absinthe Verte', 68, '');",
			"INSERT INTO brands (name, abv, notes) VALUES ('Trinity', 63, '');"
		 ],
		 function(){
			 console.log("Populated!");
			 readDB();
		 }, catchError);
}
	
function readDB(){
	 html5sql.process(
		 [
			"SELECT * FROM brands;",
		 ],
		 function(transaction, results, rowsArray){
			 console.log("Success");
			 for(var i=0; i<rowsArray.length; i++){
				var id = rowsArray[i].id;
				var name = rowsArray[i].name;
				var abv = rowsArray[i].abv;
				console.log("Retrieved: "+id+" - "+name+" "+abv);
			 }
		 }, catchError);
}
			 
function dropTables(){
	 html5sql.process(
		 [
			"DROP TABLE brands;",
		 ],
		 function(){
			 console.log("Dropped!");
		 }, catchError);
}









function addAbsinthe(){
	 html5sql.process(
		 [
			"INSERT INTO brands (name, abv, notes) VALUES ('Trinity', 63, '');"
		 ],
		 function(){
			 console.log("Added!");
		 }, catchError);
}
			 
function updateAbsinthe(){
	 html5sql.process(
		 [
			"UPDATE brands SET name='', abv='', notes='' WHERE id=1;",
		 ],
		 function(){
			 console.log("Updated!");
		 }, catchError);
}

function removeAbsinthe(){
	 html5sql.process(
		 [
			"DELETE FROM brands WHERE id=1;",
		 ],
		 function(){
			 console.log("Removed!");
		 }, catchError);
}
			 
			 
			 
			 
			 
			 
			 
			 
function catchError(error, statement){
	console.error("Error: " + error.message + " when processing " + statement);
}

checkDB();