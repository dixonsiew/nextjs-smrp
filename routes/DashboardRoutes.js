import { v4 as uuid } from 'uuid';
/**
 *  All Dashboard Routes
 *
 *  Understanding name/value pairs for Dashboard routes
 *
 *  Applicable for main/root/level 1 routes
 *  icon 		: String - It's only for main menu or you can consider 1st level menu item to specify icon name.
 *
 *  Applicable for main/root/level 1 and subitems routes
 * 	id 			: Number - You can use uuid() as value to generate unique ID using uuid library, you can also assign constant unique ID for react dynamic objects.
 *  title 		: String - If menu contains childern use title to provide main menu name.
 *  badge 		: String - (Optional - Default - '') If you specify badge value it will be displayed beside the menu title or menu item.
 * 	badgecolor 	: String - (Optional - Default - 'primary' ) - Used to specify badge background color.
 *
 *  Applicable for subitems / children items routes
 *  name 		: String - If it's menu item in which you are specifiying link, use name ( don't use title for that )
 *  children	: Array - Use to specify submenu items
 *
 *  Used to segrigate menu groups
 *  grouptitle : Boolean - (Optional - Default - false ) If you want to group menu items you can use grouptitle = true,
 *  ( Use title : value to specify group title  e.g. COMPONENTS , DOCUMENTATION that we did here. )
 *
 */

export const DashboardMenu = [
  {
    id: uuid(),
		title: 'Reports',
		icon: 'layers',
    children: [
      { id: uuid(), link: '/main/report/master-pd101/list', name: 'PD101' },
      { id: uuid(), link: '/main/report/master-pd102/list', name: 'PD102' },
      { id: uuid(), link: '/main/report/master-pd105/list', name: 'PD105' },
      { id: uuid(), link: '/main/report/master-pd301/list', name: 'PD301' },
      { id: uuid(), link: '/main/report/master-rh101/list', name: 'RH101' },
      { id: uuid(), link: '/main/report/master-rh301/list', name: 'RH301' },
    ],
  },
  {
    id: uuid(),
		title: 'Setup',
		icon: 'layers',
    children: [
      { id: uuid(), link: '/main/setup/delivery-type/list', name: 'Birth Delivery Type' },
      { id: uuid(), link: '/main/setup/city/list', name: 'City' },
      { id: uuid(), link: '/main/setup/country/list', name: 'Country' },
      { id: uuid(), link: '/main/setup/diag-item-type/list', name: 'Diagnosis Item Type' },
      { id: uuid(), link: '/main/setup/discharge-officer/list', name: 'Discharge Officer Type' },
      { id: uuid(), link: '/main/setup/discharge-type/list', name: 'Discharge Type' },
      { id: uuid(), link: '/main/setup/ethnic-group/list', name: 'Ethnic Group' },
      { id: uuid(), link: '/main/setup/gender/list', name: 'Gender' },
      { id: uuid(), link: '/main/setup/id-type/list', name: 'ID Type' },
      { id: uuid(), link: '/main/setup/marital-status/list', name: 'Marital Status' },
      { id: uuid(), link: '/main/setup/person-category-code/list', name: 'Person Category Code' },
      { id: uuid(), link: '/main/setup/referral/list', name: 'Referral' },
      { id: uuid(), link: '/main/setup/relationship/list', name: 'Relationship' },
      { id: uuid(), link: '/main/setup/religion/list', name: 'Religion' },
      { id: uuid(), link: '/main/setup/speciality/list', name: 'Speciality' },
      { id: uuid(), link: '/main/setup/state/list', name: 'State' },
      { id: uuid(), link: '/main/setup/title/list', name: 'Title' },
      { id: uuid(), link: '/main/setup/user/list', name: 'User' },
      { id: uuid(), link: '/main/setup/visit-type/list', name: 'Visit Type' },
      { id: uuid(), link: '/main/setup/adm-status/list', name: 'Ward Admission Status' },
      { id: uuid(), link: '/main/setup/ward-class/list', name: 'Ward Class' },
    ],
  },
	{
    id: uuid(),
		title: 'Profile',
		icon: 'layers',
    children: [
      { id: uuid(), link: '/main/profile/change-password', name: 'Change Password' },
    ],
	},
];

export default DashboardMenu;
