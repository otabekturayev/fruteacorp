import React, { useEffect, useMemo, useState } from 'react'
import FilterList from '../../components/productList/FilterList'
import { Outlet } from 'react-router'
import {useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Breadcrumb from '../../components/BreadCrumb'
import { useFetch } from '../../hooks/useFetch'

const ProductList = () => {
  const [breadCrumbItems, setBreadCrumbItems] = useState([]);
  const { categoryId } = useParams();
  const { i18n } = useTranslation();

  // Kategoriya ID'sining yaroqliligini tekshirish
  const isValidCategoryId = useMemo(() => categoryId && categoryId?.includes('categoryId=') && categoryId?.split('=')[1], [categoryId]);

  // Kategoriyani fetch qilish
  const { data } = useFetch(isValidCategoryId ? `/categories/${isValidCategoryId}` : null);

  useEffect(() => {
    const baseBreadcrumb = [
      { label: i18n.language === 'uz' ? 'Bosh sahifa' : i18n.language === 'ru' ? 'Главная страница' : 'Home', to: '/' },
      { label: i18n.language === 'uz' ? 'Turkumlar' : i18n.language === 'ru' ? 'Категории' : 'Categories', to: '/products' }
    ];
  
    const generateParentBreadcrumbs = (category) => {
      const breadcrumbs = [];
      let currentCategory = category;
  
      while (currentCategory?.parent) {
        breadcrumbs.unshift({
          label: i18n.language === 'uz' ? currentCategory?.parent?.title_uz :
                 i18n.language === 'ru' ? currentCategory?.parent?.title_ru : currentCategory?.parent?.title_en,
          to: `/products/categoryId=${currentCategory?.parent.id}`
        });
        currentCategory = currentCategory?.parent;
      }
  
      return breadcrumbs;
    };
  
    if (data && isValidCategoryId) {
      const newBreadcrumb = [
        ...baseBreadcrumb,
        ...generateParentBreadcrumbs(data),
        {
          label: i18n.language === 'uz' ? data?.title_uz :
                 i18n.language === 'ru' ? data?.title_ru : data?.title_en,
          to: `/products/categoryId=${data?.id}`
        }
      ];
      setBreadCrumbItems(newBreadcrumb);
    } else {
      setBreadCrumbItems(baseBreadcrumb);
    }
  }, [data, i18n.language, isValidCategoryId]);

  return (
    <section className='container'>
      <div className='lg:mb-[20px] '>
      <Breadcrumb items={breadCrumbItems}/>
      </div>
      <div className='flex lg:flex-row flex-col gap-y-[10px] gap-x-[20px]'>
        <FilterList />
        <Outlet/>
      </div>
    </section>
  )
}

export default ProductList