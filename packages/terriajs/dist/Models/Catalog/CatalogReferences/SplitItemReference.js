import getDereferencedIfExists from "../../../Core/getDereferencedIfExists";
import TerriaError from "../../../Core/TerriaError";
import { getName } from "../../../ModelMixins/CatalogMemberMixin";
import ReferenceMixin from "../../../ModelMixins/ReferenceMixin";
import SplitItemReferenceTraits from "../../../Traits/TraitsClasses/SplitItemReferenceTraits";
import CreateModel from "../../Definition/CreateModel";
import { BaseModel } from "../../Definition/Model";
/**
 * This item is a reference to a copy of the original item from which it was created.
 *
 * It is used to create a split copy of a workbench item, so that when creating a
 * share url, we don't have to export the definition traits of the copy
 * separately. This reduces share url size and avoids exporting any sensitive
 * data that the traits may have.
 */
export default class SplitItemReference extends ReferenceMixin(CreateModel(SplitItemReferenceTraits)) {
    get type() {
        return SplitItemReference.type;
    }
    async forceLoadReference(previousTarget) {
        if (this.splitSourceItemId === undefined || this.uniqueId === undefined) {
            throw new TerriaError({
                title: { key: "splitterTool.errorTitle" },
                message: "`splitSourceItemId` and `uniqueId` must be defined"
            });
        }
        let sourceItem = this.terria.getModelByIdOrShareKey(BaseModel, this.splitSourceItemId);
        if (sourceItem === undefined) {
            throw new TerriaError({
                title: { key: "splitterTool.errorTitle" },
                message: {
                    key: "splitterTool.modelNotFoundErrorMessage",
                    parameters: {
                        id: this.splitSourceItemId
                    }
                },
                importance: 1
            });
        }
        try {
            // Ensure the target we create is a concrete item
            sourceItem = getDereferencedIfExists(sourceItem);
            return sourceItem.duplicateModel(this.uniqueId, this);
        }
        catch (e) {
            throw TerriaError.from(e, {
                title: { key: "splitterTool.errorTitle" },
                message: {
                    key: "splitterTool.duplicateModelErrorMessage",
                    parameters: {
                        name: getName(sourceItem)
                    }
                },
                importance: 1
            });
        }
    }
}
SplitItemReference.type = "split-reference";
//# sourceMappingURL=SplitItemReference.js.map