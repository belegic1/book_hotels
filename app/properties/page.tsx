import React from 'react';
import getCurrentUser from '../actions/getCurrentUser';
import ClientOnly from '../api/components/ClientOnly';
import EmptyState from '../api/components/EmptyState';
import PropertiesClient from './PropertiesClient';
import getListings from '../actions/getListings';

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({
    userId: currentUser.id,
  });
  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you don't have any property"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
  return <div></div>;
};

export default PropertiesPage;
