"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSubmissionErrors = void 0;
/**
 * This internal function is used to convert an object matching the form shape with errors to a
 * format compatible with react-hook-form. It's used to handle submission errors. Only useful when
 * you are implementing a custom form without leveraging our Form component.
 *
 * @example
 * const MyForm = () => {
 *     const { register, handleSubmit, setError } = useForm();
 *     const onSubmit = data => {
 *         return saveAsync(data).catch(error => setSubmissionErrors(error.body.details));
 *     };
 *
 *     return (
 *         <form onSubmit={handleSubmit(onSubmit)}>
 *             ...
 *         </form>
 *     );
 * };
 */
var setSubmissionErrors = function (errors, setError) {
    var setErrorFromArray = function (errors, rootPath) {
        errors.forEach(function (error, index) {
            if (typeof error === 'object') {
                setErrorFromObject(error, "".concat(rootPath, ".").concat(index, "."));
                return;
            }
            if (Array.isArray(error)) {
                setErrorFromArray(error, "".concat(rootPath, ".").concat(index, "."));
                return;
            }
            setError("".concat(rootPath, ".").concat(index), {
                type: 'server',
                message: error.toString(),
            });
        });
    };
    var setErrorFromObject = function (errors, rootPath) {
        Object.entries(errors).forEach(function (_a) {
            var name = _a[0], error = _a[1];
            if (typeof error === 'object') {
                setErrorFromObject(error, "".concat(rootPath).concat(name, "."));
                return;
            }
            if (Array.isArray(error)) {
                setErrorFromArray(error, "".concat(rootPath).concat(name, "."));
                return;
            }
            setError("".concat(rootPath).concat(name), {
                type: 'server',
                message: error.toString(),
            });
        });
    };
    setErrorFromObject(errors, '');
};
exports.setSubmissionErrors = setSubmissionErrors;
//# sourceMappingURL=setSubmissionErrors.js.map