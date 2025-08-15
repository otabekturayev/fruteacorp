import React from 'react'
import SettingsForm from './SettingsForm'
import { useTranslation } from 'react-i18next'

const UserSetting = () => {
  const { t } = useTranslation()
  return (
    <div className='w-full border-[0.8px] border-custom-green-400 p-8 rounded-[4px]'>  
      <h2 className='font-inter text-[24px] font-medium'>{t("user.my-info")}</h2>
      <SettingsForm/>
    </div>
  )
}

export default UserSetting