const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const responseText = pm.response.text();
let responseJson = "{'hello': 'World'}";

if (isJsonString(responseText)) {
    responseJson = pm.response.json();
} else {
    responseJson = `{'_PAYLOAD': '${responseText}'}`
}

const resJsonString = JSON.stringify(responseJson);

const template = `
    <!-- when using the mode "code", it's important to specify charset utf-8 -->
    <meta charset="utf-8">
    <link href="https://cdn.jsdelivr.net/npm/jsoneditor@9.10.2/dist/jsoneditor.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/jsoneditor@9.10.2/dist/jsoneditor.min.js"></script>

    <style>
        table {
            margin-bottom: 0;
        }

        table, table tr, table td {
            border: none !important;
        }
    </style>
    <div id="jsoneditor" style="width: 100%; height: 100%;"></div>


    <script>
        // create the editor
        const container = document.getElementById("jsoneditor")
        const options = {}
        const editor = new JSONEditor(container, options)

        // set json
        editor.set(${resJsonString})

        // get json
        const updatedJson = editor.get()
    </script>
`;

pm.visualizer.set(template);