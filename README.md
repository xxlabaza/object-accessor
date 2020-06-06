
# Overview

[![Build Status](https://travis-ci.com/xxlabaza/object-accessor.svg?branch=master)](https://travis-ci.com/xxlabaza/object-accessor)

`ObjectAccessor` - is a helper wrapper for objects, which contains methods for retrieving the object's values by keys.

## Usage

> installation:
>
> ```bash
> $> npm install --save @xxlabaza/object-accessor
> ```

Example:

```typescript
import { ObjectAccessor } from '@xxlabaza/object-accessor'

const json = { ... };

const accessor = new ObjectAccessor(json);

accessor.getString('key1'); // => Result<string, Error>
accessor.getNumber('key2').or(42); // retrieve a number, or return 42, if undefined
accessor.getBoolean('key3.innerObjectKey').orError(); // try to get boolean from nested object or throw the Error
accessor.getObjectAccessor('key3').getBoolean('innerObjectKey').orError(); // the same as previous
```

## Development

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Building

To build the project, do the following:

```bash
$> npm run build
...
```

### Running the tests

To run the project's test, do the following:

```bash
$> npm test

...

Test Suites: 1 passed, 1 total
Tests:       6 passed, 6 total
Snapshots:   0 total
Time:        1.233 s
Ran all test suites.
```

## Changelog

To see what has changed in recent versions of the project, see the [changelog](./CHANGELOG.md) file.

## Contributing

Please read [contributing](./CONTRIBUTING.md) file for details on my code of conduct, and the process for submitting pull requests to me.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/appulse-projects/utils-java/tags).

## Authors

* **[Artem Labazin](https://github.com/xxlabaza)** - creator and the main developer

## License

This project is licensed under the Apache License 2.0 License - see the [license](./LICENSE) file for details
