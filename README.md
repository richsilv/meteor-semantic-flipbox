meteor-semantic-flipbox
=======================

Flipbox plugin for Semantic-UI, packaged for Meteor. An alternative to checkbox/toggle/slider for offering two options.

###Install
`meteor add richsilv:semantic-flipbox`

###Usage

#####Template

```html
    <template name="formTemplate">
      <div class="ui form">
        <div class="field">
          <label>Emacs or Vim?</label>
          <div class="ui flipbox">
            <input type="hidden">
            <div class="displayed text">Select</div>
            <i class="right exchange icon"></i>
            <div class="choices">
              <div class="item" data-value="0">Emacs</div>
              <div class="item" data-value="1">Vim</div>
            </div>
          </div>
        </div>
      </div>
    </template>
```

#####Initialisation

```js
    Template.formTemplate.rendered = function() {
      $('.ui.flipbox').flipbox();
    }
```
    
#####Methods

```js
    $('.ui.flipbox').flipbox('get choice');
    > 0
    $('.ui.flipbox').flipbox('set choice', 1);
    > 1
    $('.ui.flipbox').flipbox('get choice');
    > 1    
```    
