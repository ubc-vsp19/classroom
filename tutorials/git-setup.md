# Setting up Git for the assignments

To set up your assignment repository, you will **need a Github account** and also have **Git installed on your local machine**. If you have not done these, follow the instructions below, otherwise you can skip to the next section.

## Installing Git

Go to [https://git-scm.com/downloads](https://git-scm.com/downloads) and download Git.

## Setting up Github

If you have not already, [create a Github account](https://github.com). You will need to **share your Github username with the TA** to get an invitation to your assignment repository.


# Setting up your assignment repository

This walk-through assumes you're working in a Unix environment - i.e. using `ls` for listing directories instead of `dir` as in MS-DOS.

1. Accept the Github invitation sent to **your primary email address** associated with your Github account.
2. Once you have access to the repository, clone the repository on your local machine by using the `git clone` command as shown in the example below:

```
# In this code example we assume:
#     your repository name is "vsp-group-a",
#     your working directory is at "~/projects"
# Replace the above two tokens with your own settings.

~/projects$ git clone https://github.com/ubc-vsp19/classroom/vsp-group-a.git
```

3. The repository is now copied to your machine at `~/projects/vsp-group-a`. Navigate into the directory to see the content.

```
~/projects$ cd vsp-group-a
~/projects/vsp-group-a$ ls
```

In your repository, you should see nothing but the `.git` directory and a `.gitignore` file. The `.git` directory is where Git stores all the information about your repository such as commits and branches.


4. Enter `git status` in your command line to see which branch you're currently working on and if there are any files that have been added or modified since your last commit.

```
~/projects/vsp-group-a$ git status
On branch master
nothing to commit, working directory clean
```

If you followed the steps so far, the above message should print to your terminal, saying that there is no new or modified files.


5. You can enter `git log` to see the commit history.

```
~/projects/vsp-group-a$ git log
```

The log should show only the first commit that your TA has made.


6. Now we will make a test commit to understand the assignment submission procedure. Submitting an assignment would roughly follow these steps:
    1. Create a new branch called `assignment-N` where `N` is the assignment number.
    2. Check out the branch to begin working on it.
    3. Work on your assignment, writing and updating files as needed.
    4. When your assignment is ready for submission, commit all the changes.
    5. Push the branch to Github.


7. Create a new branch called `assignment-0` by entering the Git command `git branch` as shown below:

```
~/projects/vsp-group-a$ git branch assignment-0
```

Type `git branch` again to see the list of branches

```
~/projects/vsp-group-a$ git branch
  assignment-0
* master
```

The list shows that the new branch was created, but you are still on the `master` branch.

8. Begin working on `assignment-0` branch by checking it out via `git checkout` command.

```
~/projects/vsp-group-a$ git checkout assignment-0
Switched to branch 'assignment-0'
```
You are now on the `assignment-0` branch, as indicated by the message on the terminal.

* As a shortcut, steps 7 & 8 can be done using a single command `git checkout -b assignment-0`.


9. In this branch, create a new file using your preferred text editor. Or you can just create a dummy readme file as shown below:

```
~/projects/vsp-group-a$ echo "Hello Git!" > README.md
```

10. Now type `git status` to see the list of files that have not been committed.

```
~/projects/vsp-group-a$ git status
On branch assignment-0
Untracked files:
  (use "git add <file>..." to include in what will be commmitted)

        README.md

nothing added to commit but untracked files present (use "git add" to track)
```

The message indicates that `README.md` has not been committed yet, and suggests we use `git add` command to add this file to the commit.

11. Use `git add` command to add the file

```
~/projects/vsp-group-a$ git add .
```

The command line argument `.` tells Git to add everything in the current directory. If you want to add just the `README.md` file, you can type specifically `git add README.md`.

12. Typing `git status` should indicate that `README.md` has been "staged", but not yet "committed".

```
~/projects/vsp-group-a$ git status
On branch assignment-0
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   README.md

```

13. Commit the "staged" changes to the branch using the `git commit` command.

```
~/projects/vsp-group-a$ git commit -m "my first commit"
[assignment-0 e4bea89] my first commit
 1 file changed, 1 insertion(+)
 create mode 100644 README.md
```

The command line argument `-m` means the following argument (`"my first commit"`) will be the commit message you would like to include in the commit. If you omit this flag, the commit process will be interactive.

14. Type `git log` to verify that your commit was successful. The output on terminal should show 2 commits, with the latest commit on top.

15. Your local Git repository has the latest commits, but the remote repository at Github does not know about your changes. You will need to update the remote repository by "pushing" your changes to Github via `git push`.

```
~/projects/vsp-group-a$ git push origin assignment-0
Counting objects: 3, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 940 bytes | 0 bytes/s, done.
Total 3 (delta 0), reused 0 (delta 0)
To https://github.com/ubc-vsp19/classroom/vsp-group-a.git
 * [new branch]      assignment-0 -> assignment-0
```

The command line argument `origin` refers to the remote repository at Github. You can check the list of remote repositories by typing `git remote -v`.

16. On a browser, navigate to your Github repository at `https://github.com/ubc-vsp19/classroom/vsp-group-a` to see the updated repository. The TA's will be looking at this repository to mark the assignments.