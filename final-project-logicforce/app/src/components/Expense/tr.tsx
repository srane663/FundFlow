import React from 'react';
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from "../../lib/helper";
import { toggleChangeAction, updateAction, deleteAction } from '../../redux/reducer';

// Type definitions
interface UserData {
  name?: string;
  category?: string;
  description?: string;
  date?: string;
  status?: string;
  _id?: string;
}

interface ReduxState {
  app: {
    client: {
      toggleForm: boolean;
    }
  }
}

export default function Tr({ 
  name, 
  category, 
  description, 
  date, 
  status 
}: UserData): JSX.Element {
  const { isLoading, isError, data, error } = useQuery<UserData[], Error>('users', getUser);
  const dispatch = useDispatch();
  
  // Commented out Redux state selector 
  // const visible = useSelector((state: ReduxState) => state.app.client.toggleForm);

  const onUpdate = (): void => {
    // Implementation depends on your Redux setup
    // dispatch(toggleChangeAction(_id))
  }

  const onDelete = (): void => {
    // Implementation depends on your Redux setup
    // if(!visible){
    //     dispatch(deleteAction(_id))
    // }
  }

  return (
    <tr className="bg-gray-50 text-center">
      <td className="px-16 py-2 flex flex-row items-center">
        <span className="text-center ml-2 font-semibold">{name || "unknown"}</span>
      </td>
      <td className="px-6 py-2">
        <span>{category || "unknown"}</span>
      </td>
      <td className="px-6 py-2">
        <span>{description || "unknown"}</span>
      </td>
      <td className="px-6 py-2">
        <span>{date || "unknown"}</span>
      </td>
      <td className="px-6 py-2">
        <button className="cursor">
          <span className="bg-green-500 text-white px-5 py-1 rounded">
            {status || "unknown"}
          </span>
        </button>
      </td>
      <td className="px-6 py-2">
        <button className="cursor" onClick={onUpdate}>
          <span className="bg-green-500 text-white px-5 py-1 rounded">Update</span>
        </button>
        <button className="cursor" onClick={onDelete}>
          <span className="bg-green-500 text-white px-5 py-1 rounded">Delete</span>
        </button>
      </td>
    </tr>
  );
}