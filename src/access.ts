/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    /**管理员 */
    AdminGroup: currentUser && currentUser.group === 'admin',
    /**终端购买用户 */
    UserGroup: currentUser && currentUser.group === 'user',
    /**提供软件支持用户 */
    MerchantGroup: currentUser && currentUser.group === 'merchant',
  };
}
