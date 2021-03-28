import unittest
from selenium import webdriver
import time
from ddt import ddt, data, unpack, file_data
import yaml, os

cur_path = os.path.abspath(os.path.dirname(__file__))


# def readFile():
#     params = []
#     file = open('params.txt', 'r', encoding='UTF-8')
#     for line in file.readlines():
#         params.append(line.strip('\n').split(','))
#
#     return params

@ddt
class ForTest(unittest.TestCase):

    def __init__(self, *args, **kwargs):
        unittest.TestCase.__init__(self, *args, **kwargs)

    def setUp(self) -> None:
        self.driver = webdriver.Chrome()
        self.driver.get('http://localhost:3000/')

    def tearDown(self) -> None:
        # time.sleep(3)
        self.driver.quit()

    #
    # @data(*readFile())
    # @unpack
    # def test_1(self, url, txt):
    #     self.driver.get(url)
    #     self.driver.find_element_by_id('kw').send_keys(txt)
    #     self.driver.find_element_by_id('su').click()

    @unittest.skip("skip")
    def test_login_page(self):
        self.driver.find_element_by_xpath('//a[text()="Log in"]').click()
        title = self.driver.find_element_by_xpath('//*[@id="root"]/div[2]/h2').text
        self.assertEqual(title, 'Login', 'this is not login page')

    @unittest.skip("skip")
    def test_supervisor_page(self):
        self.driver.find_element_by_xpath('//a[text()="Supervisor Home"]').click()
        title = self.driver.find_element_by_xpath('//*[@id="title"]').text
        self.assertEqual(title, 'Supervisor Homepage', 'this is not Supervisor Homepage')

    @unittest.skip("skip")
    @file_data(cur_path + '/../data/' + 'project.yml')
    def test_project_page(self, **kwargs):
        self.driver.find_element_by_xpath('//*[@id="basic-nav-dropdown" and text()="Project"]').click()

        page = kwargs.get('page')
        address = '//*[@class="dropdown-item" and text()="{page_name}"]'
        self.driver.find_element_by_xpath(address.format(page_name=page)).click()
        get_title = self.driver.find_element_by_xpath('//*[@id="title"]').text

        title = kwargs.get('title')
        msg = 'This is not {page_name}'
        self.assertEqual(get_title, title, msg.format(page_name=page))

    # start test

    @file_data(cur_path + '/../data/' + 'navbar.yml')
    def test_navbar(self, **kwargs):
        # self.driver.find_element_by_xpath('//*[@id="basic-nav-dropdown" and text()="Coordinator"]').click()
        # address = '//a[@class="dropdown-item" and text()="{page_name}"]'

        path = kwargs.get('path')
        button = kwargs.get('button')
        self.driver.find_element_by_xpath(path.format(button_name=button)).click()
        get_title = self.driver.find_element_by_xpath('//*[@id="title"]').text

        title = kwargs.get('title')
        msg = 'This is not {title_name}'
        self.assertEqual(get_title, title, msg.format(title_name=title))


if __name__ == '__main__':
    unittest.main()
