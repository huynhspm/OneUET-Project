import { useGetManyAggregate } from '../dataProvider';
/**
 * @typedef UseReferenceResult
 * @type {Object}
 * @property {boolean} isFetching: boolean indicating if the reference is loading
 * @property {boolean} isLoading: boolean indicating if the reference has loaded at least once
 * @property {Object} referenceRecord: the referenced record.
 */
/**
 * Fetch reference record, and return it when available
 *
 * The reference prop should be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { isLoading, referenceRecord } = useReference({
 *     id: 7,
 *     reference: 'users',
 * });
 *
 * @param {Object} option
 * @param {string} option.reference The linked resource name
 * @param {string} option.id The id of the reference
 *
 * @returns {UseReferenceResult} The reference record
 */
export var useReference = function (_a) {
    var reference = _a.reference, id = _a.id, options = _a.options;
    var _b = useGetManyAggregate(reference, { ids: [id] }, options), data = _b.data, error = _b.error, isLoading = _b.isLoading, isFetching = _b.isFetching, refetch = _b.refetch;
    return {
        referenceRecord: error ? undefined : data ? data[0] : undefined,
        refetch: refetch,
        error: error,
        isLoading: isLoading,
        isFetching: isFetching,
    };
};
//# sourceMappingURL=useReference.js.map