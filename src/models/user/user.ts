
// [CASE-I] --     SELECT * 했을 때
// u.id msh => 덮어써서 사라짐
// u.id ksl => 덮어써서 사라짐 (id)


// [CASE-II] 했을 때
// uid, cid, name, type, user_id 다 제대로 나옴.

// 결론: alias 지정하면 방어 가능하나
// USING JOIN 불가능해짐.
// alias 지정하지 않으면 같은 column name 은 덮어씌워져서 둘 중 하나 날아감.
const getAllUsers = ` 
    SELECT *
    FROM users
`;

export {
    getAllUsers
}