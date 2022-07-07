var path = require('path'),
fs = require('fs');

function fromDir(startPath, filter) {

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    var files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.endsWith(filter)) {
            var name = path.basename(filename,".svg");
            var newId = `id="tl_` + name + `"`;
            console.log("File:" +filename);
            console.log("New ID:" +newId);
            console.log("---------------");
            replacedDataFile(filename,`id="Layer_1"`,newId);
            replacedDataFile(filename,`id="vector"`,newId);
        };
    };
};

function replacedDataFile(filepath, searchString, replaceString) {
    var data = fs.readFileSync(filepath, 'utf-8');

    var newValue = data.replace(searchString, replaceString);

    fs.writeFileSync(filepath, newValue, 'utf-8');
}

fromDir(process.argv[2], '.svg');

