using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoApp
{
    public class ToDoList
    {
        string title;
        List<string> tasks = new List<string>();

        public ToDoList(string title)
        {
            this.title = title;
        }

        public void AddTask(string task)
        {
            tasks.Add(task);
        }

        public List<string> GetTasks()
        {
            return tasks;
        }
    }
}