## UrlParser

Url解析库

#### Demo

    <script src="path/to/UrlParser.js"></script>
    <script>
        var parser = UrlParser({
            cfg: "http://abc.com/:id/:name",
            url: "http://abc.com/id/name?id=123&name=345"
        });
        
        parser.parse();
        
        /**
            result:
        
            {
                pathParam: {
                    id: "id",
                    name: "name"
                },
                quertString: {
                    id: "123",
                    name: "345"
                }
            }
        
        **/
        
    </script>
