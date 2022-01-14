import { SITE_NAME } from '../configs/site'

export const getAdminPageTitle = (postfix?: string) => {
  const prefix = `${SITE_NAME}管理後台`
  return postfix ? `${prefix} - ${postfix}` : prefix
}
