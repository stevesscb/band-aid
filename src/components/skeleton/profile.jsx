import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function CompsSkeletonProfile() {
  return (
    <>
      <div className="text-center">
        <Skeleton height={400} width="80%" />
        <Skeleton height={50} width={70} />
        <Skeleton height={40} width={40} />
      </div>
      <Skeleton count={8} width="40%" />
      <div className="text-center">
        <Skeleton width="10%" />
        <Skeleton count={8} width="90%" />
        <Skeleton width="10%" />
        <Skeleton height={50} width="60%" borderRadius="50%" />
        <Skeleton width="10%" />
        <Skeleton height={50} width="60%" borderRadius="50%" />
        <Skeleton width="10%" />
        <Skeleton height={50} width="60%" borderRadius="50%" />
        <Skeleton width="10%" />
        <Skeleton height={50} width="60%" borderRadius="50%" />
      </div>
    </>
  )
}
