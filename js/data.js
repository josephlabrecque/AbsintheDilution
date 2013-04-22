html5sql.openDatabase("com.fracturedvisionmedia.absinthes", "Absinthe Database", 3*1024*1024);

function checkDB(){
	html5sql.process(
		 [
			"CREATE TABLE if not exists brands (id INTEGER PRIMARY KEY, name TEXT, abv INTEGER, notes TEXT);",
			"SELECT * FROM brands;"
		 ],
		 function(transaction, results, rowsArray){
			 if(rowsArray.length > 1){
				 readDB();
			 }else{
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
			 readDB();
		 }, catchError);
}
	
function readDB(){
	 html5sql.process(
		 [
			"SELECT * FROM brands ORDER BY LOWER(name);",
		 ],
		 function(transaction, results, rowsArray){
			 $('#AbsintheBrands').empty();
             clearCalculation();
			 var html ='';
			 for(var i=0; i<rowsArray.length; i++){
				var id = rowsArray[i].id;
				var name = rowsArray[i].name;
				var abv = rowsArray[i].abv;
                 var notes = rowsArray[i].notes;
				html += '<li><a href="#dilute" data-id="' + id + '" onclick="absintheClicked(this);" data-name="' + name + '" data-abv="' + abv + '" data-notes="' + notes + '">' + name + '</a><a href="#ConfigAbsinthe" data-rel="popup" data-position-to="window" data-transition="pop" data-id="' + id + '" onclick="absintheClicked(this);" data-name="' + name + '" data-abv="' + abv + '" data-notes="' + notes + '"></a></li>';
			 }
			 $('#AbsintheBrands').append($(html));
             $('#AbsintheBrands').listview('refresh');
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
    if($("#absinthe-name-add").val().length >= 4 && $("#absinthe-abv-add").val().length >= 2){
         html5sql.process(
             [
                "INSERT INTO brands (name, abv, notes) VALUES ('" + escapeFilter( $("#absinthe-name-add").val() ) + "', '" + escapeFilter( $("#absinthe-abv-add").val() ) + "', '" + escapeFilter( $("#absinthe-notes-add").val() ) + "');"
             ],
             function(){
                $("#AddAbsinthe").popup("close");
                $("#absinthe-name-add").val("");
                $("#absinthe-abv-add").val("");
                $("#absinthe-notes-add").val("");
                readDB();
             }, catchError);
    }
}
			 
function updateAbsinthe(){
    if($("#absinthe-name-update").val().length >= 4 && $("#absinthe-abv-update").val().length >= 2){
         html5sql.process(
             [
                "UPDATE brands SET name='" + escapeFilter( $("#absinthe-name-update").val() ) + "', abv='" + escapeFilter( $("#absinthe-abv-update").val() ) + "', notes='" + escapeFilter( $("#absinthe-notes-update").val() ) + "' WHERE id='" + selectedAbsinthe.id + "';"
             ],
             function(){
                 $("#UpdateAbsinthe").popup("close");
                 readDB();
             }, catchError);
    }
}

function removeAbsinthe(){
	 html5sql.process(
		 [
			"DELETE FROM brands WHERE id='" + selectedAbsinthe.id + "';",
		 ],
		 function(){
             $("#RemoveAbsinthe").popup("close");
             readDB();
		 }, catchError);
}
			 

			 
			 
function catchError(error, statement){
	console.error("Error: " + error.message + " when processing " + statement);
}
