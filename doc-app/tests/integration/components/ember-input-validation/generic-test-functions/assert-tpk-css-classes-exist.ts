export async function assertTpkCssClassesExist(
 assert: Assert,
 input: string,
) {
    assert.dom(`.tpk-${input}-container`).exists().hasAttribute(`data-test-tpk-prefab-${input}-container`);
    assert.dom(`.tpk-${input}-container .tpk-${input}-input`).exists()
    assert.dom(`.tpk-${input}-container .tpk-validation-errors`).exists()
    assert.dom(`.tpk-${input}-container .tpk-label`).exists()
    assert.dom(`label`).hasClass(`tpk-${input}-container`);
    assert.dom(`input`).hasClass(`tpk-${input}-input`);
    assert.dom(`label > div:first-of-type`).hasClass(`tpk-label`, `The first div inside label has the class tpk-label.`);
    assert.dom(`label > div:last-of-type`).hasClass(`tpk-validation-errors`, `The second div inside label has the class tpk-validation-errors.`);
}