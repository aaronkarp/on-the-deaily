import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Field,
  Input
} from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import { PersonAddRegular } from '@fluentui/react-icons';
import { useState } from 'react';
import User from './User';

function UserSelector() {
  const { users, addUser, selectUser } = useTasks();
  const [newUserName, setNewUserName] = useState('');
  const [newUserImage, setNewUserImage] = useState('');

  function handleSubmit(e) {
    if (newUserName === '' || newUserImage === '') {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    const newId = crypto.randomUUID();
    const user = {
      id: newId,
      name: newUserName,
      image: newUserImage,
      tasks: []
    };
    addUser(user);
    selectUser(user);
    resetForm();
  }

  function resetForm() {
    setNewUserName('');
    setNewUserImage('');
  }

  return (
    <div className="user-selector">
      <ul className="user-list">
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </ul>
      <div className="add-user-button">
        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="primary" size="large" icon={<PersonAddRegular />}>
              Add user
            </Button>
          </DialogTrigger>
          <DialogSurface>
            <form onSubmit={handleSubmit}>
              <DialogBody>
                <DialogTitle>Add user</DialogTitle>
                <DialogContent>
                  <Field label="Name" required>
                    <Input size="large" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
                  </Field>
                  <Field label="Image URL" required>
                    <Input size="large" value={newUserImage} onChange={(e) => setNewUserImage(e.target.value)} />
                  </Field>
                </DialogContent>
                <DialogActions>
                  <DialogTrigger disableButtonEnhancement>
                    <Button appearance="secondary">Close</Button>
                  </DialogTrigger>
                  <DialogTrigger disableButtonEnhancement>
                    <Button type="submit" appearance="primary">
                      Add user
                    </Button>
                  </DialogTrigger>
                </DialogActions>
              </DialogBody>
            </form>
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
}

export default UserSelector;
