export default function RBAC() {
  return (
    <main style={{ minHeight: '100vh', padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ background: '#fff', borderRadius: '8px', padding: '2rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h1>Linux RBAC File Permission Demo</h1>
        <p>
          This classroom activity demonstrates how to simulate <strong>Role-Based Access Control (RBAC)</strong> in Linux using:
        </p>
        <ul>
          <li>Users</li>
          <li>Groups</li>
          <li>Folder permissions</li>
          <li>File permissions</li>
        </ul>

        <p>The example creates three Linux users:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Account</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Access Level</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>super</code></td>
              <td style={{ padding: '0.75rem' }}>Can access <code>super</code>, <code>admin</code>, and <code>user</code> folders</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>admin</code></td>
              <td style={{ padding: '0.75rem' }}>Can access <code>admin</code> and <code>user</code> folders</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>user</code></td>
              <td style={{ padding: '0.75rem' }}>Can access only the <code>user</code> folder</td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Scenario</h2>
        <p>You are going to create three users:</p>
        <ul>
          <li><code>super</code></li>
          <li><code>admin</code></li>
          <li><code>user</code></li>
        </ul>

        <p>You will also create three folders:</p>
        <ul>
          <li><code>/rbac-demo/super</code></li>
          <li><code>/rbac-demo/admin</code></li>
          <li><code>/rbac-demo/user</code></li>
        </ul>

        <p>Each folder will contain a file called:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>data.txt</pre>

        <p>The goal is to configure permissions so that:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>super  → can read all files
admin  → can read admin and user files
user   → can read only user files</pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 1: Create the Users</h2>
        <p>Run the following commands as root or with <code>sudo</code>:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo adduser super
sudo adduser admin
sudo adduser user`}
        </pre>

        <p>Each command will ask you to create a password for the new user.</p>
        <p>You can also set or reset passwords manually:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo passwd super
sudo passwd admin
sudo passwd user`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 2: Create RBAC-Style Groups</h2>
        <p>We will use Linux groups to control access to each folder.</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo groupadd supergroup
sudo groupadd admingroup
sudo groupadd usergroup`}
        </pre>

        <p>These groups represent access levels.</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Group</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>supergroup</code></td>
              <td style={{ padding: '0.75rem' }}>Access to the <code>super</code> folder</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>admingroup</code></td>
              <td style={{ padding: '0.75rem' }}>Access to the <code>admin</code> folder</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>usergroup</code></td>
              <td style={{ padding: '0.75rem' }}>Access to the <code>user</code> folder</td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 3: Add Users to the Correct Groups</h2>
        <p>The <code>super</code> account should have access to everything:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
sudo usermod -aG supergroup,admingroup,usergroup super
        </pre>

        <p>The <code>admin</code> account should have access to the admin and user folders:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
sudo usermod -aG admingroup,usergroup admin
        </pre>

        <p>The <code>user</code> account should only have access to the user folder:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
sudo usermod -aG usergroup user
        </pre>

        <p>The group membership model looks like this:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`super → supergroup + admingroup + usergroup
admin → admingroup + usergroup
user  → usergroup`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 4: Create the Folder Structure</h2>
        <p>Create a demo folder under the root directory:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo mkdir -p /rbac-demo/super
sudo mkdir -p /rbac-demo/admin
sudo mkdir -p /rbac-demo/user`}
        </pre>

        <p>The folder structure will look like this:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`/rbac-demo
├── super
├── admin
└── user`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 5: Create a data.txt File in Each Folder</h2>
        <p>Create a file inside each folder:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`echo "This is SUPER secret data" | sudo tee /rbac-demo/super/data.txt
echo "This is ADMIN level data" | sudo tee /rbac-demo/admin/data.txt
echo "This is USER level data" | sudo tee /rbac-demo/user/data.txt`}
        </pre>

        <p>The folder structure now looks like this:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`/rbac-demo
├── super
│   └── data.txt
├── admin
│   └── data.txt
└── user
    └── data.txt`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 6: Set Group Ownership</h2>
        <p>Assign each folder to the correct group:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo chown -R root:supergroup /rbac-demo/super
sudo chown -R root:admingroup /rbac-demo/admin
sudo chown -R root:usergroup /rbac-demo/user`}
        </pre>

        <p>This means:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Folder</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Owner</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Group</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>/rbac-demo/super</code></td>
              <td style={{ padding: '0.75rem' }}><code>root</code></td>
              <td style={{ padding: '0.75rem' }}><code>supergroup</code></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>/rbac-demo/admin</code></td>
              <td style={{ padding: '0.75rem' }}><code>root</code></td>
              <td style={{ padding: '0.75rem' }}><code>admingroup</code></td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>/rbac-demo/user</code></td>
              <td style={{ padding: '0.75rem' }}><code>root</code></td>
              <td style={{ padding: '0.75rem' }}><code>usergroup</code></td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 7: Set Folder Permissions</h2>
        <p>Folders need execute permission so users can enter them.</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo chmod 750 /rbac-demo/super
sudo chmod 750 /rbac-demo/admin
sudo chmod 750 /rbac-demo/user`}
        </pre>

        <p>The permission <code>750</code> means:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Permission</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>7</code></td>
              <td style={{ padding: '0.75rem' }}>Owner can read, write, and execute</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>5</code></td>
              <td style={{ padding: '0.75rem' }}>Group can read and execute</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>0</code></td>
              <td style={{ padding: '0.75rem' }}>Others have no access</td>
            </tr>
          </tbody>
        </table>

        <p>For folders, this means users in the correct group can:</p>
        <ul>
          <li>Enter the folder</li>
          <li>List the folder contents</li>
          <li>Read files if the file permissions allow it</li>
        </ul>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 8: Set File Permissions</h2>
        <p>Set the files so only the owner and group can read them:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`sudo chmod 640 /rbac-demo/super/data.txt
sudo chmod 640 /rbac-demo/admin/data.txt
sudo chmod 640 /rbac-demo/user/data.txt`}
        </pre>

        <p>The permission <code>640</code> means:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Permission</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>6</code></td>
              <td style={{ padding: '0.75rem' }}>Owner can read and write</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>4</code></td>
              <td style={{ padding: '0.75rem' }}>Group can read</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>0</code></td>
              <td style={{ padding: '0.75rem' }}>Others have no access</td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 9: Check the Permissions</h2>
        <p>Run:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`ls -l /rbac-demo
ls -l /rbac-demo/super
ls -l /rbac-demo/admin
ls -l /rbac-demo/user`}
        </pre>

        <p>You should see something similar to:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
drwxr-x--- root supergroup super
drwxr-x--- root admingroup admin
drwxr-x--- root usergroup user
        </pre>

        <p>The files should look similar to:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`-rw-r----- root supergroup data.txt
-rw-r----- root admingroup data.txt
-rw-r----- root usergroup data.txt`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 10: Test Access as the super User</h2>
        <p>Switch to the <code>super</code> account:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
su - super
        </pre>

        <p>Test access to all three files:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`cat /rbac-demo/super/data.txt
cat /rbac-demo/admin/data.txt
cat /rbac-demo/user/data.txt`}
        </pre>

        <p>Expected result:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`This is SUPER secret data
This is ADMIN level data
This is USER level data`}
        </pre>

        <p>The <code>super</code> user should be able to read all three files.</p>

        <p>Exit back to your original account:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
exit
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 11: Test Access as the admin User</h2>
        <p>Switch to the <code>admin</code> account:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
su - admin
        </pre>

        <p>Test access:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`cat /rbac-demo/super/data.txt
cat /rbac-demo/admin/data.txt
cat /rbac-demo/user/data.txt`}
        </pre>

        <p>Expected result:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`cat: /rbac-demo/super/data.txt: Permission denied
This is ADMIN level data
This is USER level data`}
        </pre>

        <p>The <code>admin</code> user should not be able to access the <code>super</code> folder, but should be able to access the <code>admin</code> and <code>user</code> folders.</p>

        <p>Exit back:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
exit
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Step 12: Test Access as the user User</h2>
        <p>Switch to the <code>user</code> account:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
su - user
        </pre>

        <p>Test access:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`cat /rbac-demo/super/data.txt
cat /rbac-demo/admin/data.txt
cat /rbac-demo/user/data.txt`}
        </pre>

        <p>Expected result:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`cat: /rbac-demo/super/data.txt: Permission denied
cat: /rbac-demo/admin/data.txt: Permission denied
This is USER level data`}
        </pre>

        <p>The <code>user</code> account should only be able to read the file inside the <code>user</code> folder.</p>

        <p>Exit back:</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
exit
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Complete Setup Script</h2>
        <p>The following script creates the full demo environment.</p>
        <p style={{ fontStyle: 'italic', color: '#6b7280' }}>Note: The <code>adduser</code> commands are interactive and will ask for passwords.</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`#!/bin/bash

# Create users
sudo adduser super
sudo adduser admin
sudo adduser user

# Create groups
sudo groupadd supergroup
sudo groupadd admingroup
sudo groupadd usergroup

# Add users to groups
sudo usermod -aG supergroup,admingroup,usergroup super
sudo usermod -aG admingroup,usergroup admin
sudo usermod -aG usergroup user

# Create folder structure
sudo mkdir -p /rbac-demo/super
sudo mkdir -p /rbac-demo/admin
sudo mkdir -p /rbac-demo/user

# Create data files
echo "This is SUPER secret data" | sudo tee /rbac-demo/super/data.txt
echo "This is ADMIN level data" | sudo tee /rbac-demo/admin/data.txt
echo "This is USER level data" | sudo tee /rbac-demo/user/data.txt

# Set ownership
sudo chown -R root:supergroup /rbac-demo/super
sudo chown -R root:admingroup /rbac-demo/admin
sudo chown -R root:usergroup /rbac-demo/user

# Set folder permissions
sudo chmod 750 /rbac-demo/super
sudo chmod 750 /rbac-demo/admin
sudo chmod 750 /rbac-demo/user

# Set file permissions
sudo chmod 640 /rbac-demo/super/data.txt
sudo chmod 640 /rbac-demo/admin/data.txt
sudo chmod 640 /rbac-demo/user/data.txt

echo "RBAC demo setup complete."
echo "Test with:"
echo "su - super"
echo "su - admin"
echo "su - user"`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Optional Cleanup Script</h2>
        <p>Use this script to remove the demo environment after class.</p>
        <p style={{ fontStyle: 'italic', color: '#d32f2f' }}>Warning: This deletes the users, groups, and <code>/rbac-demo</code> folder.</p>
        <pre style={{ background: '#1f2937', color: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`#!/bin/bash

# Delete demo folder
sudo rm -rf /rbac-demo

# Delete users and their home directories
sudo deluser --remove-home super
sudo deluser --remove-home admin
sudo deluser --remove-home user

# Delete groups
sudo groupdel supergroup
sudo groupdel admingroup
sudo groupdel usergroup

echo "RBAC demo environment removed."`}
        </pre>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Teaching Explanation</h2>
        <p>Linux permissions are based on three permission categories:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
owner : group : others
        </pre>

        <p>For example:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
-rw-r-----
        </pre>

        <p>This means:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Section</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Permission</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Meaning</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}>Owner</td>
              <td style={{ padding: '0.75rem' }}><code>rw-</code></td>
              <td style={{ padding: '0.75rem' }}>Can read and write</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}>Group</td>
              <td style={{ padding: '0.75rem' }}><code>r--</code></td>
              <td style={{ padding: '0.75rem' }}>Can read</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}>Others</td>
              <td style={{ padding: '0.75rem' }}><code>---</code></td>
              <td style={{ padding: '0.75rem' }}>No access</td>
            </tr>
          </tbody>
        </table>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Folder Permissions</h2>
        <p>Folders use permissions slightly differently from files.</p>

        <p>For a folder:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
drwxr-x---
        </pre>

        <p>The permissions mean:</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '1rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #ddd' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Permission</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Meaning for Folders</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>r</code></td>
              <td style={{ padding: '0.75rem' }}>Can list folder contents</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '0.75rem' }}><code>w</code></td>
              <td style={{ padding: '0.75rem' }}>Can create, rename, or delete files</td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem' }}><code>x</code></td>
              <td style={{ padding: '0.75rem' }}>Can enter the folder</td>
            </tr>
          </tbody>
        </table>

        <p>The <code>x</code> permission is very important for folders. Without it, a user cannot enter the directory.</p>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>RBAC Model Used in This Demo</h2>
        <p>This demo uses Linux groups to simulate RBAC.</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`super
├── admin
│   └── user`}
        </pre>

        <p>Access works by assigning users to groups:</p>
        <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '4px', overflow: 'auto' }}>
{`super → supergroup + admingroup + usergroup
admin → admingroup + usergroup
user  → usergroup`}
        </pre>

        <p>This means:</p>
        <ul>
          <li>The <code>super</code> user has access to all folders.</li>
          <li>The <code>admin</code> user has access to the <code>admin</code> and <code>user</code> folders.</li>
          <li>The <code>user</code> account has access only to the <code>user</code> folder.</li>
        </ul>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Discussion Questions</h2>
        <ol>
          <li>Why does the <code>super</code> user need to be in all three groups?</li>
          <li>What would happen if the folder permission was changed from <code>750</code> to <code>700</code>?</li>
          <li>What would happen if the file permission was changed from <code>640</code> to <code>644</code>?</li>
          <li>Why is the execute permission important on folders?</li>
          <li>How does this relate to RBAC in applications and enterprise systems?</li>
        </ol>

        <hr style={{ margin: '2rem 0', borderColor: '#e5e7eb' }} />

        <h2>Key Takeaway</h2>
        <p>
          Linux file permissions can be used to demonstrate the basic idea of RBAC.
        </p>
        <p>
          Instead of giving permissions directly to every user, permissions are assigned to groups. Users are then added to the groups that match their role.
        </p>
        <p>
          This is similar to how many real-world systems manage access control.
        </p>
      </div>
    </main>
  );
}
