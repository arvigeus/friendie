module.exports = {
  extends: ["react-app", "plugin:jsx-a11y/recommended"],
  plugins: ["import", "jsx-a11y"],
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  },
  rules: {
    // use static function in classes where possible
    // https://eslint.org/docs/rules/class-methods-use-this
    "class-methods-use-this": [
      "warn",
      {
        exceptMethods: [
          "render",
          "getInitialState",
          "getDefaultProps",
          "getChildContext",
          "componentDidMount",
          "shouldComponentUpdate",
          "componentDidUpdate",
          "componentWillUnmount",
          "componentDidCatch",
          "getSnapshotBeforeUpdate"
        ]
      }
    ],
    // specify the maximum cyclomatic complexity allowed in a program
    complexity: ["warn", 11],

    // verify super() callings in constructors
    // https://eslint.org/docs/rules/constructor-super
    "constructor-super": "warn",

    // require or disallow named function expressions
    // https://eslint.org/docs/rules/func-names
    "func-names": [
      "warn",
      "always",
      {
        generators: "as-needed"
      }
    ],

    // encourages use of dot notation whenever possible
    // https://eslint.org/docs/rules/dot-notation
    "dot-notation": ["warn", { allowKeywords: true }],

    // disallow use of alert
    // https://eslint.org/docs/rules/no-alert
    "no-alert": "warn",

    // disallow await inside of loops
    // https://eslint.org/docs/rules/no-await-in-loop
    "no-await-in-loop": "warn",

    // disallow modifying variables of class declarations
    // https://eslint.org/docs/rules/no-class-assign
    "no-class-assign": "warn",

    // disallow comparisons to negative zero
    // https://eslint.org/docs/rules/no-compare-neg-zero
    "no-compare-neg-zero": "warn",

    // disallow use of constant expressions in conditions
    // https://eslint.org/docs/rules/no-constant-condition
    "no-constant-condition": "warn",

    // disallow the use of console
    // https://eslint.org/docs/rules/no-console
    "no-console": "warn",

    // disallow the use of debugger
    // https://eslint.org/docs/rules/no-debugger
    "no-debugger": "warn",

    // disallow empty statements
    // https://eslint.org/docs/rules/no-empty
    "no-empty": "warn",

    // disallow the use of leading or trailing decimal points in numeric literals
    // https://eslint.org/docs/rules/no-floating-decimal
    "no-floating-decimal": "warn",

    // disallow implicit type conversions
    // https://eslint.org/docs/rules/no-implicit-coercion
    "no-implicit-coercion": [
      "off",
      {
        boolean: false,
        number: true,
        string: true,
        allow: []
      }
    ],

    // disallow reassignments of native objects or read-only globals
    // https://eslint.org/docs/rules/no-global-assign
    "no-global-assign": ["warn", { exceptions: [] }],

    // disallow use of new operator when not part of the assignment or comparison
    // https://eslint.org/docs/rules/no-new#disallow-new-for-side-effects-no-new
    "no-new": "warn",

    // disallow overcomplicated use of ternary
    // https://eslint.org/docs/rules/no-nested-ternary
    "no-nested-ternary": "warn",

    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    // rule: https://eslint.org/docs/rules/no-param-reassign.html
    "no-param-reassign": [
      "warn",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "acc", // for reduce accumulators
          "accumulator", // for reduce accumulators
          "e", // for e.returnvalue
          "ctx", // for Koa routing
          "req", // for Express requests
          "request", // for Express requests
          "res", // for Express responses
          "response", // for Express responses
          "$scope" // for Angular 1 scopes
        ]
      }
    ],

    // disallow specified syntax
    // https://eslint.org/docs/rules/no-restricted-syntax
    "no-restricted-syntax": ["warn", "ForInStatement", "WithStatement"],

    // disallow redundant `return await`
    // https://eslint.org/docs/rules/no-return-await
    "no-return-await": "warn",

    // disallow shadowing of restricted names
    // https://eslint.org/docs/rules/no-shadow
    "no-shadow": [
      "off", // TODO: Reconsider this rule in the future
      {
        hoist: "all",
        allow: ["resolve", "reject", "done", "next", "err", "error"]
      }
    ],

    // disallow use of undefined when initializing variables
    // https://eslint.org/docs/rules/no-undef-init
    "no-undef-init": "warn",

    // disallow return/throw/break/continue inside finally blocks
    // https://eslint.org/docs/rules/no-unsafe-finally
    "no-unsafe-finally": "warn",

    // disallow negating the left operand of relational operators
    // https://eslint.org/docs/rules/no-unsafe-negation
    "no-unsafe-negation": "warn",

    // disallow declaration of variables that are not used in the code
    // https://eslint.org/docs/rules/no-unused-vars
    "no-unused-vars": [
      "warn",
      { vars: "all", args: "after-used", ignoreRestSiblings: true }
    ],

    // disallow redundant return; keywords
    // https://eslint.org/docs/rules/no-useless-return
    "no-useless-return": "warn",

    // require let or const instead of var
    // https://eslint.org/docs/rules/no-var
    "no-var": "warn",

    // disallow use of void operator
    // https://eslint.org/docs/rules/no-void
    "no-void": "warn",

    // require method and property shorthand syntax for object literals
    // https://eslint.org/docs/rules/object-shorthand
    "object-shorthand": [
      "warn",
      "always",
      {
        ignoreConstructors: false,
        avoidQuotes: true
      }
    ],

    // suggest using arrow functions as callbacks
    // https://eslint.org/docs/rules/prefer-arrow-callback
    "prefer-arrow-callback": [
      "warn",
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],

    // suggest using const
    // https://eslint.org/docs/rules/prefer-const
    "prefer-const": [
      "warn",
      {
        destructuring: "all"
      }
    ],

    // prefer destructuring from arrays and objects
    // https://eslint.org/docs/rules/prefer-destructuring
    "prefer-destructuring": [
      "warn",
      { object: true, array: false },
      { enforceForRenamedProperties: false }
    ],

    // require using Error objects as Promise rejection reasons
    // https://eslint.org/docs/rules/prefer-promise-reject-errors
    "prefer-promise-reject-errors": ["warn", { allowEmptyReject: true }],

    // use rest parameters instead of arguments
    // https://eslint.org/docs/rules/prefer-rest-params
    "prefer-rest-params": "warn",

    // suggest using the spread operator instead of .apply()
    // https://eslint.org/docs/rules/prefer-spread
    "prefer-spread": "warn",

    // suggest using template literals instead of string concatenation
    // https://eslint.org/docs/rules/prefer-template
    "prefer-template": "warn",

    // require use of the second argument for parseInt()
    // https://eslint.org/docs/rules/radix
    radix: "warn",

    // Prevent usage of button elements without an explicit type attribute
    // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/button-has-type.md
    "react/button-has-type": [
      "warn",
      {
        button: true,
        submit: true,
        reset: false
      }
    ],

    // Enforce boolean attributes notation in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md
    "react/jsx-boolean-value": ["warn", "never", { always: [] }],

    // Enforce event handler naming conventions in JSX
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-handler-names.md
    "react/jsx-handler-names": [
      "warn",
      {
        eventHandlerPrefix: "handle",
        eventHandlerPropPrefix: "on"
      }
    ],

    // prevent using this.state within a this.setState
    // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/no-access-state-in-setstate.md
    "react/no-access-state-in-setstate": "warn",

    // prevent usage of Array index in keys
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-array-index-key.md
    "react/no-array-index-key": "warn",

    // prevent usage of deprecated methods
    // disabled in eslint-config-react-app because of https://github.com/facebook/create-react-app/issues/5204
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-deprecated.md
    "react/no-deprecated": ["warn"],

    // prevent usage of setState in componentDidUpdate
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-did-update-set-state.md
    "react/no-did-update-set-state": "warn",

    // prevent using string references
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-string-refs.md
    "react/no-string-refs": "warn",

    // prevent invalid characters from appearing in markup
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unescaped-entities.md
    "react/no-unescaped-entities": "warn",

    // prevent usage of unknown DOM property
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unknown-property.md
    "react/no-unknown-property": "warn",

    // prevent unused state values
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/no-unused-state.md
    "react/no-unused-state": "warn",

    // prevent usage of UNSAFE_ methods
    // https://github.com/yannickcr/eslint-plugin-react/blob/157cc932be2cfaa56b3f5b45df6f6d4322a2f660/docs/rules/no-unsafe.md
    "react/no-unsafe": "warn",

    // Enforce a defaultProps definition for every prop that is not a required prop
    // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/require-default-props.md
    "react/require-default-props": [
      "warn",
      {
        forbidDefaultForRequired: true
      }
    ],

    // prevent extra closing tags for components without children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md
    "react/self-closing-comp": "warn",

    // enforce component methods order
    // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/sort-comp.md
    "react/sort-comp": [
      "warn",
      {
        order: [
          "static-methods",
          "instance-variables",
          "lifecycle",
          "/^on.+$/",
          "getters",
          "setters",
          "/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/",
          "instance-methods",
          "everything-else",
          "rendering"
        ],
        groups: {
          lifecycle: [
            "displayName",
            "propTypes",
            "contextTypes",
            "childContextTypes",
            "mixins",
            "statics",
            "defaultProps",
            "constructor",
            "getDefaultProps",
            "getInitialState",
            "state",
            "getChildContext",
            "componentDidMount",
            "shouldComponentUpdate",
            "componentDidUpdate",
            "componentWillUnmount"
          ],
          rendering: ["/^render.+$/", "render"]
        }
      }
    ],

    // prevent void DOM elements from receiving children
    // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/void-dom-elements-no-children.md
    "react/void-dom-elements-no-children": "warn",

    // import sorting
    // https://eslint.org/docs/rules/sort-imports
    "sort-imports": [
      "warn",
      {
        ignoreDeclarationSort: true,
        memberSyntaxSortOrder: ["none", "all", "single", "multiple"]
      }
    ],

    // require a Symbol description
    // https://eslint.org/docs/rules/symbol-description
    "symbol-description": "warn",

    // ensure JSDoc comments are valid
    // https://eslint.org/docs/rules/valid-jsdoc
    "valid-jsdoc": "warn"
  }
};
