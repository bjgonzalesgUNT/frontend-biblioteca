import {useState} from 'react'

interface Props<T> {
  data: T[]
  numberOfItems: number
}

export const PaginationTable = <T,>({data = [], numberOfItems} : Props<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / numberOfItems);
  const startIndex = (currentPage - 1) * numberOfItems;
  const endIndex = startIndex + numberOfItems;
  const visibleData = data.slice(startIndex, endIndex);

  return {totalPages, currentPage, setCurrentPage, visibleData}
};