import React, { Component } from "react";
import type { NextPage } from 'next';
import Head from 'next/head';
import UserNav from '../components/UserNav/UserNav';
import styles from '../styles/Home.module.scss';
import List from '../components/List/list';
import Script from 'next/script';

// Define interface for shopping list item
interface ShoppingListItem {
  _id?: string;
  name?: string;
  quantity?: number;
  // Add other properties as needed
}

// Define state interface
interface ShoppingListState {
  allShoppingList: ShoppingListItem[];
}

// Define props interface (empty in this case)
interface ShoppingListProps {}

// Creates Shopping List page
class ShoppingList extends React.Component<ShoppingListProps, ShoppingListState> {
  constructor(props: ShoppingListProps) {
    super(props);
    this.state = {
      allShoppingList: []
    };
  }

  // Get all the shopping list from database on component load 
  async componentDidMount() {
    try {
      const userId = localStorage.getItem("loggedInUserId");
      
      if (!userId) {
        console.error("No user ID found");
        return;
      }

      const response = await fetch(`/api/shoppinglist/${userId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ShoppingListItem[] = await response.json();
      
      this.setState({
        allShoppingList: data
      });
    } catch (error) {
      console.error("Failed to fetch shopping list:", error);
    }
  }

  render() {
    const { allShoppingList } = this.state;
    
    return (
      <div className={styles.homecover}>
        <Head>
          <title>Expense Tracker</title>
          <meta name="description" content="Manage and visualize your expenses" />
          <link rel="icon" href="/favicon.png" />
          <Script />
        </Head>
        <main className={styles.mainHome}>
          <div className='maincontainer'>
            <UserNav />
            <List data={allShoppingList} />
          </div>
        </main>
      </div>
    );
  }
}

export default ShoppingList;