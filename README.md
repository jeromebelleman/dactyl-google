Bind Pentadactyl keys to Google Search results cursor

```javascript
au LocationChange google.[^/]+/search :map j -js plugins.google.cursor(1)
au LocationChange google.[^/]+/search :map k -js plugins.google.cursor(-1)
au LocationChange google.[^/]+/search :map <CR> -js plugins.google.open()
```
