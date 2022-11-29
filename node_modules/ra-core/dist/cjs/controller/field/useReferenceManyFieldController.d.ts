import { RaRecord, SortPayload } from '../../types';
import { ListControllerResult } from '../list';
export interface UseReferenceManyFieldControllerParams {
    filter?: any;
    page?: number;
    perPage?: number;
    record?: RaRecord;
    reference: string;
    resource: string;
    sort?: SortPayload;
    source?: string;
    target: string;
}
/**
 * Fetch reference records, and return them when available
 *
 * The reference prop should be the name of one of the <Resource> components
 * added as <Admin> child.
 *
 * @example
 *
 * const { isLoading, data } = useReferenceManyFieldController({
 *     resource
 *     reference: 'users',
 *     record: {
 *         userId: 7
 *     }
 *     target: 'comments',
 *     source: 'userId',
 *     page: 1,
 *     perPage: 25,
 * });
 *
 * @param {Object} props
 * @param {string} props.resource The current resource name
 * @param {string} props.reference The linked resource name
 * @param {Object} props.record The current resource record
 * @param {string} props.target The target resource key
 * @param {Object} props.filter The filter applied on the recorded records list
 * @param {string} props.source The key of the linked resource identifier
 * @param {number} props.page the page number
 * @param {number} props.perPage the number of item per page
 * @param {Object} props.sort the sort to apply to the referenced records
 *
 * @returns {ListControllerResult} The reference many props
 */
export declare const useReferenceManyFieldController: (props: UseReferenceManyFieldControllerParams) => ListControllerResult;
//# sourceMappingURL=useReferenceManyFieldController.d.ts.map